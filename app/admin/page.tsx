"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.scss';

interface Application {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  resume: string;
  coverLetter?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'interview phase' | 'onboarding' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface Position {
  _id: string;
  title: string;
  isActive: boolean;
  summary?: string;
  icon?: string;
  tags?: string[];
  description?: string;
  category?: 'engineering' | 'security' | 'operations';
  createdAt: string;
  updatedAt: string;
}

interface CultureCardForm {
  title: string;
  icon: string;
  description: string;
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactInquiry {
  _id: string;
  name: string;
  organization?: string;
  email?: string;
  clearanceLevel?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'applications' | 'positions' | 'careersPage' | 'blogs' | 'contacts'
  >('applications');
  const [authLoading, setAuthLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  // Positions management state
  const [positions, setPositions] = useState<Position[]>([]);
  const [positionsLoading, setPositionsLoading] = useState(false);
  const [positionsError, setPositionsError] = useState<string | null>(null);
  const [newPosition, setNewPosition] = useState({
    title: '',
    summary: '',
    icon: 'work',
    tags: '',
    description: '',
    category: 'engineering' as 'engineering' | 'security' | 'operations',
  });
  const [addingPosition, setAddingPosition] = useState(false);
  const [editingPositionId, setEditingPositionId] = useState<string | null>(null);
  const [editPosition, setEditPosition] = useState({
    title: '',
    summary: '',
    icon: 'work',
    tags: '',
    description: '',
    category: 'engineering' as 'engineering' | 'security' | 'operations',
  });
  const [savingPosition, setSavingPosition] = useState(false);

  const [careersForm, setCareersForm] = useState({
    heroSubtext: '',
    statsQuote: '',
    applyPhaseLabel: '',
    monolithHeading: '',
    monolithBody: '',
    monolithImageUrl: '',
    monolithCtaLabel: '',
    monolithCtaHref: '',
    cultureCards: [] as CultureCardForm[],
  });
  const [careersLoading, setCareersLoading] = useState(false);
  const [careersError, setCareersError] = useState<string | null>(null);
  const [careersSaving, setCareersSaving] = useState(false);

  // Blogs management state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsError, setBlogsError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogDescription, setNewBlogDescription] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogImageUrl, setNewBlogImageUrl] = useState('');
  const [savingBlog, setSavingBlog] = useState(false);

  // Contact inquiry state
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/applications');
      const data = await response.json();

      if (response.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (data.success) {
        setApplications(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to load applications');
      }
    } catch (err) {
      setError('Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await fetch('/api/admin/me');
        const data = await response.json();
        if (!mounted) return;
        if (!response.ok || !data.success) {
          router.replace('/admin/login');
          return;
        }
        await fetchApplications();
      } catch {
        if (mounted) router.replace('/admin/login');
      } finally {
        if (mounted) setAuthLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router, fetchApplications]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatStatus = (status: string) => {
    return status
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'reviewed':
        return styles.statusReviewed;
      case 'interview phase':
        return styles.statusInterview;
      case 'onboarding':
        return styles.statusOnboarding;
      case 'rejected':
        return styles.statusRejected;
      default:
        return styles.statusPending;
    }
  };

  const updateStatus = async (applicationId: string, newStatus: string) => {
    try {
      setUpdatingStatus(true);
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the application in the list
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus as Application['status'] } : app
          )
        );

        // Update selected application if it's the one being updated
        if (selectedApplication && selectedApplication._id === applicationId) {
          setSelectedApplication({
            ...selectedApplication,
            status: newStatus as Application['status'],
          });
        }
      } else {
        setError(data.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedApplication) {
      updateStatus(selectedApplication._id, e.target.value);
    }
  };

  // Positions management functions
  const fetchPositions = async () => {
    try {
      setPositionsLoading(true);
      setPositionsError(null);
      const response = await fetch('/api/positions', { credentials: 'include' });
      const data = await response.json();

      if (data.success) {
        setPositions(data.data);
      } else {
        setPositionsError(data.error || 'Failed to load positions');
      }
    } catch (err) {
      setPositionsError('Failed to fetch positions');
      console.error('Error fetching positions:', err);
    } finally {
      setPositionsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'positions') {
      fetchPositions();
    }
  }, [activeTab]);

  const fetchCareersSettings = async () => {
    try {
      setCareersLoading(true);
      setCareersError(null);
      const response = await fetch('/api/careers-settings', { credentials: 'include' });
      const data = await response.json();
      if (data.success && data.data) {
        const d = data.data;
        const cards = Array.isArray(d.cultureCards) ? d.cultureCards : [];
        while (cards.length < 3) {
          cards.push({ title: '', icon: 'work', description: '' });
        }
        setCareersForm({
          heroSubtext: d.heroSubtext ?? '',
          statsQuote: d.statsQuote ?? '',
          applyPhaseLabel: d.applyPhaseLabel ?? '',
          monolithHeading: d.monolithHeading ?? '',
          monolithBody: d.monolithBody ?? '',
          monolithImageUrl: d.monolithImageUrl ?? '',
          monolithCtaLabel: d.monolithCtaLabel ?? '',
          monolithCtaHref: d.monolithCtaHref ?? '',
          cultureCards: cards.slice(0, 3).map((c: CultureCardForm) => ({
            title: c.title ?? '',
            icon: c.icon ?? 'work',
            description: c.description ?? '',
          })),
        });
      } else {
        setCareersError(data.error || 'Failed to load careers page settings');
      }
    } catch (err) {
      setCareersError('Failed to fetch careers settings');
      console.error(err);
    } finally {
      setCareersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'careersPage') {
      fetchCareersSettings();
    }
  }, [activeTab]);

  const handleSaveCareersSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCareersSaving(true);
      setCareersError(null);
      const response = await fetch('/api/careers-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          heroSubtext: careersForm.heroSubtext,
          statsQuote: careersForm.statsQuote,
          applyPhaseLabel: careersForm.applyPhaseLabel,
          monolithHeading: careersForm.monolithHeading,
          monolithBody: careersForm.monolithBody,
          monolithImageUrl: careersForm.monolithImageUrl,
          monolithCtaLabel: careersForm.monolithCtaLabel,
          monolithCtaHref: careersForm.monolithCtaHref,
          cultureCards: careersForm.cultureCards,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        setCareersError(data.error || 'Save failed');
      }
    } catch (err) {
      setCareersError('Failed to save');
      console.error(err);
    } finally {
      setCareersSaving(false);
    }
  };

  const handleAddPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPosition.title.trim()) return;

    try {
      setAddingPosition(true);
      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: newPosition.title.trim(),
          summary: newPosition.summary.trim(),
          icon: newPosition.icon.trim() || 'work',
          tags: newPosition.tags,
          description: newPosition.description,
          category: newPosition.category,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewPosition({
          title: '',
          summary: '',
          icon: 'work',
          tags: '',
          description: '',
          category: 'engineering',
        });
        await fetchPositions();
      } else {
        setPositionsError(data.error || 'Failed to add position');
      }
    } catch (err) {
      setPositionsError('Failed to add position');
      console.error('Error adding position:', err);
    } finally {
      setAddingPosition(false);
    }
  };

  const startEditPosition = (p: Position) => {
    setEditingPositionId(p._id);
    setEditPosition({
      title: p.title,
      summary: p.summary || '',
      icon: p.icon || 'work',
      tags: (p.tags || []).join(', '),
      description: p.description || '',
      category: p.category || 'engineering',
    });
  };

  const cancelEditPosition = () => {
    setEditingPositionId(null);
  };

  const handleSaveEditPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPositionId || !editPosition.title.trim()) return;

    try {
      setSavingPosition(true);
      const response = await fetch(`/api/positions/${editingPositionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: editPosition.title.trim(),
          summary: editPosition.summary.trim(),
          icon: editPosition.icon.trim() || 'work',
          tags: editPosition.tags,
          description: editPosition.description,
          category: editPosition.category,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setEditingPositionId(null);
        await fetchPositions();
      } else {
        setPositionsError(data.error || 'Failed to update position');
      }
    } catch (err) {
      setPositionsError('Failed to update position');
      console.error('Error updating position:', err);
    } finally {
      setSavingPosition(false);
    }
  };

  const handleDeletePosition = async (id: string) => {
    if (!confirm('Are you sure you want to remove this position? It will no longer appear on the careers page or application form.')) {
      return;
    }

    try {
      const response = await fetch(`/api/positions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        if (editingPositionId === id) {
          setEditingPositionId(null);
        }
        await fetchPositions();
      } else {
        setPositionsError(data.error || 'Failed to remove position');
      }
    } catch (err) {
      setPositionsError('Failed to remove position');
      console.error('Error removing position:', err);
    }
  };

  // Blogs management functions
  const fetchBlogs = async () => {
    try {
      setBlogsLoading(true);
      setBlogsError(null);
      const response = await fetch('/api/blogs');
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
      } else {
        setBlogsError(data.error || 'Failed to load blogs');
      }
    } catch (err) {
      setBlogsError('Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setBlogsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'blogs') {
      fetchBlogs();
    }
  }, [activeTab]);

  const fetchContacts = async () => {
    try {
      setContactsLoading(true);
      setContactsError(null);
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (response.status === 401) {
        router.replace('/admin/login');
        return;
      }
      if (data.success) {
        setContacts(data.data);
        if (data.data.length > 0 && !selectedContact) {
          setSelectedContact(data.data[0]);
        }
      } else {
        setContactsError(data.error || 'Failed to load contacts');
      }
    } catch (err) {
      setContactsError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setContactsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleCreateBlog = async () => {
    if (!newBlogTitle.trim() || !newBlogDescription.trim() || !newBlogContent.trim()) {
      setBlogsError('All fields are required');
      return;
    }

    try {
      setSavingBlog(true);
      setBlogsError(null);
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newBlogTitle,
          description: newBlogDescription,
          content: newBlogContent,
          imageUrl: newBlogImageUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewBlogTitle('');
        setNewBlogDescription('');
        setNewBlogContent('');
        setNewBlogImageUrl('');
        setIsEditingBlog(false);
        await fetchBlogs();
      } else {
        setBlogsError(data.error || 'Failed to create blog');
      }
    } catch (err) {
      setBlogsError('Failed to create blog');
      console.error('Error creating blog:', err);
    } finally {
      setSavingBlog(false);
    }
  };

  const handleUpdateBlog = async () => {
    if (!selectedBlog || !newBlogTitle.trim() || !newBlogDescription.trim() || !newBlogContent.trim()) {
      setBlogsError('All fields are required');
      return;
    }

    try {
      setSavingBlog(true);
      setBlogsError(null);
      const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newBlogTitle,
          description: newBlogDescription,
          content: newBlogContent,
          imageUrl: newBlogImageUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSelectedBlog(null);
        setIsEditingBlog(false);
        setNewBlogTitle('');
        setNewBlogDescription('');
        setNewBlogContent('');
        setNewBlogImageUrl('');
        await fetchBlogs();
      } else {
        setBlogsError(data.error || 'Failed to update blog');
      }
    } catch (err) {
      setBlogsError('Failed to update blog');
      console.error('Error updating blog:', err);
    } finally {
      setSavingBlog(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setNewBlogTitle(blog.title);
    setNewBlogDescription(blog.description);
    setNewBlogContent(blog.content);
    setNewBlogImageUrl(blog.imageUrl || '');
    setIsEditingBlog(true);
  };

  const handleCancelEdit = () => {
    setSelectedBlog(null);
    setIsEditingBlog(false);
    setNewBlogTitle('');
    setNewBlogDescription('');
    setNewBlogContent('');
    setNewBlogImageUrl('');
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        if (selectedBlog?._id === id) {
          handleCancelEdit();
        }
        await fetchBlogs();
      } else {
        setBlogsError(data.error || 'Failed to delete blog');
      }
    } catch (err) {
      setBlogsError('Failed to delete blog');
      console.error('Error deleting blog:', err);
    }
  };

  if (authLoading) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.container}>
          <div className={styles.loading}>Authenticating...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>
            Manage applications, contacts, positions, careers page copy, and content
          </p>
          <div className={styles.headerActions}>
            <button className={styles.tab} onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'applications' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications ({applications.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'positions' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('positions')}
          >
            Positions
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'careersPage' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('careersPage')}
          >
            Careers page
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'contacts' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts ({contacts.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'blogs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            Blogs ({blogs.length})
          </button>
        </div>

        {activeTab === 'applications' && (
          <>
            <div className={styles.sectionHeader}>
              <h2>Applications Dashboard</h2>
            </div>

            {loading && (
              <div className={styles.loading}>Loading applications...</div>
            )}

            {error && (
              <div className={styles.error}>Error: {error}</div>
            )}

            {!loading && !error && (
              <>
                {applications.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No applications found.</p>
                  </div>
                ) : (
                  <div className={styles.content}>
                    <div className={styles.listContainer}>
                      <div className={styles.applicationList}>
                        {applications.map((application) => (
                          <div
                            key={application._id}
                            className={`${styles.applicationCard} ${
                              selectedApplication?._id === application._id
                                ? styles.active
                                : ''
                            }`}
                            onClick={() => setSelectedApplication(application)}
                          >
                            <div className={styles.cardHeader}>
                              <h3 className={styles.applicantName}>{application.name}</h3>
                              <span
                                className={`${styles.statusBadge} ${getStatusBadgeClass(
                                  application.status
                                )}`}
                              >
                                {formatStatus(application.status)}
                              </span>
                            </div>
                            <p className={styles.applicantEmail}>{application.email}</p>
                            <p className={styles.applicantPosition}>{application.position}</p>
                            <p className={styles.applicantDate}>
                              Applied: {formatDate(application.createdAt)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.detailContainer}>
                      {selectedApplication ? (
                        <div className={styles.applicationDetail}>
                          <div className={styles.detailHeader}>
                            <h2 className={styles.detailTitle}>
                              {selectedApplication.name}
                            </h2>
                            <span
                              className={`${styles.statusBadge} ${getStatusBadgeClass(
                                selectedApplication.status
                              )}`}
                            >
                              {formatStatus(selectedApplication.status)}
                            </span>
                          </div>

                          <div className={styles.detailContent}>
                            <div className={styles.detailSection}>
                              <h3 className={styles.sectionTitle}>Application Status</h3>
                              <div className={styles.statusUpdateContainer}>
                                <label htmlFor="status-select" className={styles.statusLabel}>
                                  Update Status:
                                </label>
                                <select
                                  id="status-select"
                                  value={selectedApplication.status}
                                  onChange={handleStatusChange}
                                  disabled={updatingStatus}
                                  className={styles.statusSelect}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="reviewed">Reviewed</option>
                                  <option value="interview phase">Interview Phase</option>
                                  <option value="onboarding">Onboarding</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                {updatingStatus && (
                                  <span className={styles.updatingText}>Updating...</span>
                                )}
                              </div>
                            </div>

                            <div className={styles.detailSection}>
                              <h3 className={styles.sectionTitle}>Contact Information</h3>
                              <div className={styles.detailRow}>
                                <strong>Email:</strong>
                                <a
                                  href={`mailto:${selectedApplication.email}`}
                                  className={styles.link}
                                >
                                  {selectedApplication.email}
                                </a>
                              </div>
                              <div className={styles.detailRow}>
                                <strong>Phone:</strong>
                                <span>{selectedApplication.phone || '—'}</span>
                              </div>
                              <div className={styles.detailRow}>
                                <strong>Position:</strong>
                                <span>{selectedApplication.position}</span>
                              </div>
                            </div>

                            <div className={styles.detailSection}>
                              <h3 className={styles.sectionTitle}>Links & Resources</h3>
                              <div className={styles.detailRow}>
                                <strong>Resume:</strong>
                                <a
                                  href={selectedApplication.resume}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.link}
                                >
                                  View Resume
                                </a>
                              </div>
                              {selectedApplication.portfolio && (
                                <div className={styles.detailRow}>
                                  <strong>Portfolio:</strong>
                                  <a
                                    href={selectedApplication.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                  >
                                    View Portfolio
                                  </a>
                                </div>
                              )}
                              {selectedApplication.linkedin && (
                                <div className={styles.detailRow}>
                                  <strong>LinkedIn:</strong>
                                  <a
                                    href={selectedApplication.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                  >
                                    View Profile
                                  </a>
                                </div>
                              )}
                              {selectedApplication.github && (
                                <div className={styles.detailRow}>
                                  <strong>GitHub:</strong>
                                  <a
                                    href={selectedApplication.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                  >
                                    View Profile
                                  </a>
                                </div>
                              )}
                            </div>

                            {selectedApplication.message && (
                              <div className={styles.detailSection}>
                                <h3 className={styles.sectionTitle}>Additional Message</h3>
                                <p className={styles.detailText}>
                                  {selectedApplication.message}
                                </p>
                              </div>
                            )}

                            <div className={styles.detailSection}>
                              <h3 className={styles.sectionTitle}>Timeline</h3>
                              <div className={styles.detailRow}>
                                <strong>Applied:</strong>
                                <span>{formatDate(selectedApplication.createdAt)}</span>
                              </div>
                              {selectedApplication.updatedAt !== selectedApplication.createdAt && (
                                <div className={styles.detailRow}>
                                  <strong>Last Updated:</strong>
                                  <span>{formatDate(selectedApplication.updatedAt)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.emptyDetail}>
                          <p>Select an application to view details</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'contacts' && (
          <>
            <div className={styles.sectionHeader}>
              <h2>Contact Inquiries</h2>
              <p className={styles.sectionSubtitle}>
                Signals submitted from the Initiate Contact page.
              </p>
            </div>

            {contactsLoading && <div className={styles.loading}>Loading contacts...</div>}
            {contactsError && <div className={styles.error}>{contactsError}</div>}

            {!contactsLoading && !contactsError && (
              <>
                {contacts.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No contact inquiries found.</p>
                  </div>
                ) : (
                  <div className={styles.content}>
                    <div className={styles.listContainer}>
                      <div className={styles.applicationList}>
                        {contacts.map((contact) => (
                          <div
                            key={contact._id}
                            className={`${styles.applicationCard} ${
                              selectedContact?._id === contact._id ? styles.active : ''
                            }`}
                            onClick={() => setSelectedContact(contact)}
                          >
                            <div className={styles.cardHeader}>
                              <h3 className={styles.applicantName}>{contact.name}</h3>
                              <span className={`${styles.statusBadge} ${styles.statusReviewed}`}>
                                Contact
                              </span>
                            </div>
                            <p className={styles.applicantEmail}>{contact.organization || 'No organization'}</p>
                            <p className={styles.applicantPosition}>{contact.email || 'No email provided'}</p>
                            <p className={styles.applicantDate}>
                              Received: {formatDate(contact.createdAt)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.detailContainer}>
                      {selectedContact ? (
                        <div className={styles.applicationDetail}>
                          <div className={styles.detailHeader}>
                            <h2 className={styles.detailTitle}>{selectedContact.name}</h2>
                            <span className={`${styles.statusBadge} ${styles.statusReviewed}`}>Contact</span>
                          </div>
                          <div className={styles.detailContent}>
                            <div className={styles.detailSection}>
                              <h3 className={styles.sectionTitle}>Inquiry Details</h3>
                              <div className={styles.detailRow}>
                                <strong>Organization:</strong>
                                <span>{selectedContact.organization || 'N/A'}</span>
                              </div>
                              <div className={styles.detailRow}>
                                <strong>Email:</strong>
                                <span>{selectedContact.email || 'N/A'}</span>
                              </div>
                              <div className={styles.detailRow}>
                                <strong>Clearance:</strong>
                                <span>{selectedContact.clearanceLevel || 'N/A'}</span>
                              </div>
                            </div>

                            <div className={styles.detailSection}>
                              <h3 className={styles.sectionTitle}>Message</h3>
                              <p className={styles.detailText}>{selectedContact.message}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.emptyDetail}>
                          <p>Select a contact inquiry to view details</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'careersPage' && (
          <div className={styles.positionsSection}>
            <div className={styles.sectionHeader}>
              <h2>Careers page (public)</h2>
              <p className={styles.sectionSubtitle}>
                Hero copy, culture cards, monolith CTA, and apply phase label. Position rows and filters use the
                Positions tab (category: Engineering / Security / Operations).
              </p>
            </div>
            {careersError && <div className={styles.error}>{careersError}</div>}
            {careersLoading ? (
              <div className={styles.loading}>Loading settings...</div>
            ) : (
              <form onSubmit={handleSaveCareersSettings} className={styles.blogForm}>
                <textarea
                  value={careersForm.heroSubtext}
                  onChange={(e) => setCareersForm((s) => ({ ...s, heroSubtext: e.target.value }))}
                  className={styles.blogTextarea}
                  rows={3}
                  placeholder="Hero paragraph (under headline)"
                />
                <input
                  type="text"
                  value={careersForm.statsQuote}
                  onChange={(e) => setCareersForm((s) => ({ ...s, statsQuote: e.target.value }))}
                  className={styles.positionInput}
                  placeholder="Stats card quote (italic)"
                />
                <input
                  type="text"
                  value={careersForm.applyPhaseLabel}
                  onChange={(e) => setCareersForm((s) => ({ ...s, applyPhaseLabel: e.target.value }))}
                  className={styles.positionInput}
                  placeholder="Apply page phase label (e.g. Intelligence Recruitment Phase II)"
                />
                <h3 className={styles.formTitle}>Culture cards (3)</h3>
                {careersForm.cultureCards.map((card, idx) => (
                  <div key={idx} className={styles.formFields}>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const next = [...careersForm.cultureCards];
                        next[idx] = { ...next[idx], title: e.target.value };
                        setCareersForm((s) => ({ ...s, cultureCards: next }));
                      }}
                      className={styles.positionInput}
                      placeholder={`Card ${idx + 1} title`}
                    />
                    <input
                      type="text"
                      value={card.icon}
                      onChange={(e) => {
                        const next = [...careersForm.cultureCards];
                        next[idx] = { ...next[idx], icon: e.target.value };
                        setCareersForm((s) => ({ ...s, cultureCards: next }));
                      }}
                      className={styles.positionInput}
                      placeholder="Material icon name"
                    />
                    <textarea
                      value={card.description}
                      onChange={(e) => {
                        const next = [...careersForm.cultureCards];
                        next[idx] = { ...next[idx], description: e.target.value };
                        setCareersForm((s) => ({ ...s, cultureCards: next }));
                      }}
                      className={styles.blogTextarea}
                      rows={3}
                      placeholder="Description"
                    />
                  </div>
                ))}
                <input
                  type="text"
                  value={careersForm.monolithHeading}
                  onChange={(e) => setCareersForm((s) => ({ ...s, monolithHeading: e.target.value }))}
                  className={styles.positionInput}
                  placeholder="Monolith section heading"
                />
                <textarea
                  value={careersForm.monolithBody}
                  onChange={(e) => setCareersForm((s) => ({ ...s, monolithBody: e.target.value }))}
                  className={styles.blogTextarea}
                  rows={3}
                  placeholder="Monolith body"
                />
                <input
                  type="url"
                  value={careersForm.monolithImageUrl}
                  onChange={(e) => setCareersForm((s) => ({ ...s, monolithImageUrl: e.target.value }))}
                  className={styles.positionInput}
                  placeholder="Monolith background image URL"
                />
                <input
                  type="text"
                  value={careersForm.monolithCtaLabel}
                  onChange={(e) => setCareersForm((s) => ({ ...s, monolithCtaLabel: e.target.value }))}
                  className={styles.positionInput}
                  placeholder="Monolith CTA label"
                />
                <input
                  type="text"
                  value={careersForm.monolithCtaHref}
                  onChange={(e) => setCareersForm((s) => ({ ...s, monolithCtaHref: e.target.value }))}
                  className={styles.positionInput}
                  placeholder="Monolith CTA link (e.g. /contact)"
                />
                <div className={styles.formActions}>
                  <button type="submit" disabled={careersSaving} className={styles.saveButton}>
                    {careersSaving ? 'Saving...' : 'Save careers page'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'positions' && (
          <div className={styles.positionsSection}>
            <div className={styles.sectionHeader}>
              <h2>Manage Available Positions</h2>
              <p className={styles.sectionSubtitle}>
                Create roles with the same fields shown on the careers page (summary, tags, icon, description).
                Active roles appear publicly; removed roles are deactivated but stay listed here.
              </p>
            </div>

            {positionsError && (
              <div className={styles.error}>{positionsError}</div>
            )}

            <div className={styles.addPositionForm}>
              <form onSubmit={handleAddPosition} className={styles.positionCreateForm}>
                <div className={styles.formFields}>
                  <input
                    type="text"
                    value={newPosition.title}
                    onChange={(e) => setNewPosition((s) => ({ ...s, title: e.target.value }))}
                    placeholder="Title (e.g., Software Engineer)"
                    className={styles.positionInput}
                    required
                  />
                  <select
                    value={newPosition.category}
                    onChange={(e) =>
                      setNewPosition((s) => ({
                        ...s,
                        category: e.target.value as 'engineering' | 'security' | 'operations',
                      }))
                    }
                    className={styles.positionInput}
                  >
                    <option value="engineering">Category: Engineering</option>
                    <option value="security">Category: Security</option>
                    <option value="operations">Category: Operations</option>
                  </select>
                  <input
                    type="text"
                    value={newPosition.icon}
                    onChange={(e) => setNewPosition((s) => ({ ...s, icon: e.target.value }))}
                    placeholder="Material icon name (default: work)"
                    className={styles.positionInput}
                  />
                  <input
                    type="text"
                    value={newPosition.tags}
                    onChange={(e) => setNewPosition((s) => ({ ...s, tags: e.target.value }))}
                    placeholder="Tags, comma-separated (e.g., Core Engineering, Remote)"
                    className={`${styles.positionInput} ${styles.positionFullWidth}`}
                  />
                  <textarea
                    value={newPosition.summary}
                    onChange={(e) => setNewPosition((s) => ({ ...s, summary: e.target.value }))}
                    placeholder="Short summary for the careers card"
                    className={styles.blogTextarea}
                    rows={3}
                  />
                  <textarea
                    value={newPosition.description}
                    onChange={(e) => setNewPosition((s) => ({ ...s, description: e.target.value }))}
                    placeholder="Full description (optional; shown on apply page and below)"
                    className={styles.blogTextarea}
                    rows={4}
                  />
                </div>
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    disabled={addingPosition || !newPosition.title.trim()}
                    className={styles.addButton}
                  >
                    {addingPosition ? 'Adding...' : 'Add position'}
                  </button>
                </div>
              </form>
            </div>

            {positionsLoading && (
              <div className={styles.loading}>Loading positions...</div>
            )}

            {!positionsLoading && (
              <>
                {positions.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No positions found. Add your first position above.</p>
                  </div>
                ) : (
                  <div className={styles.positionsList}>
                    {positions.map((position) => (
                      <div key={position._id} className={styles.positionCard}>
                        {editingPositionId === position._id ? (
                          <form onSubmit={handleSaveEditPosition} className={styles.positionCreateForm}>
                            <div className={styles.formFields}>
                              <input
                                type="text"
                                value={editPosition.title}
                                onChange={(e) =>
                                  setEditPosition((s) => ({ ...s, title: e.target.value }))
                                }
                                className={styles.positionInput}
                                required
                              />
                              <select
                                value={editPosition.category}
                                onChange={(e) =>
                                  setEditPosition((s) => ({
                                    ...s,
                                    category: e.target.value as 'engineering' | 'security' | 'operations',
                                  }))
                                }
                                className={styles.positionInput}
                              >
                                <option value="engineering">Engineering</option>
                                <option value="security">Security</option>
                                <option value="operations">Operations</option>
                              </select>
                              <input
                                type="text"
                                value={editPosition.icon}
                                onChange={(e) =>
                                  setEditPosition((s) => ({ ...s, icon: e.target.value }))
                                }
                                placeholder="Icon name"
                                className={styles.positionInput}
                              />
                              <input
                                type="text"
                                value={editPosition.tags}
                                onChange={(e) =>
                                  setEditPosition((s) => ({ ...s, tags: e.target.value }))
                                }
                                placeholder="Tags, comma-separated"
                                className={`${styles.positionInput} ${styles.positionFullWidth}`}
                              />
                              <textarea
                                value={editPosition.summary}
                                onChange={(e) =>
                                  setEditPosition((s) => ({ ...s, summary: e.target.value }))
                                }
                                className={styles.blogTextarea}
                                rows={3}
                              />
                              <textarea
                                value={editPosition.description}
                                onChange={(e) =>
                                  setEditPosition((s) => ({ ...s, description: e.target.value }))
                                }
                                className={styles.blogTextarea}
                                rows={4}
                              />
                            </div>
                            <div className={styles.formActions}>
                              <button
                                type="submit"
                                disabled={savingPosition || !editPosition.title.trim()}
                                className={styles.addButton}
                              >
                                {savingPosition ? 'Saving...' : 'Save changes'}
                              </button>
                              <button
                                type="button"
                                onClick={cancelEditPosition}
                                className={styles.cancelButton}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className={styles.positionCardHeader}>
                              <div className={styles.positionInfo}>
                                <h3 className={styles.positionTitle}>{position.title}</h3>
                                <span
                                  className={
                                    position.isActive ? styles.positionBadgeActive : styles.positionBadgeInactive
                                  }
                                >
                                  {position.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              <div className={styles.positionCardActions}>
                                <button
                                  type="button"
                                  onClick={() => startEditPosition(position)}
                                  className={styles.smallButton}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeletePosition(position._id)}
                                  className={styles.deleteButton}
                                  title="Deactivate position"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            <div className={styles.positionDetailMeta}>
                              <span>
                                <strong>Category:</strong> {position.category || 'engineering'}
                              </span>
                              <span>
                                <strong>Icon:</strong> {position.icon || 'work'}
                              </span>
                              <span>
                                <strong>Tags:</strong>{' '}
                                {(position.tags && position.tags.length > 0
                                  ? position.tags.join(', ')
                                  : '—')}
                              </span>
                            </div>
                            {position.summary ? (
                              <p className={styles.positionSummary}>
                                <strong>Summary:</strong> {position.summary}
                              </p>
                            ) : null}
                            {position.description ? (
                              <div className={styles.positionDescription}>
                                <strong>Description</strong>
                                <pre className={styles.positionDescriptionPre}>
                                  {position.description}
                                </pre>
                              </div>
                            ) : (
                              <p className={styles.positionEmptyHint}>No long description set.</p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className={styles.blogsSection}>
            <div className={styles.sectionHeader}>
              <h2>Manage Blogs</h2>
              <p className={styles.sectionSubtitle}>
                Create, edit, and delete blog posts
              </p>
            </div>

            {blogsError && (
              <div className={styles.error}>{blogsError}</div>
            )}

            {!isEditingBlog && (
              <div className={styles.addBlogButtonContainer}>
                <button
                  onClick={() => setIsEditingBlog(true)}
                  className={styles.addButton}
                >
                  + Create New Blog
                </button>
              </div>
            )}

            {(isEditingBlog || selectedBlog) && (
              <div className={styles.blogForm}>
                <h3 className={styles.formTitle}>
                  {selectedBlog ? 'Edit Blog' : 'Create New Blog'}
                </h3>
                <div className={styles.formFields}>
                  <input
                    type="text"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    placeholder="Blog Title"
                    className={styles.blogInput}
                  />
                  <textarea
                    value={newBlogDescription}
                    onChange={(e) => setNewBlogDescription(e.target.value)}
                    placeholder="Short description (shown in blog cards)"
                    className={styles.blogTextarea}
                    rows={3}
                  />
                  <input
                    type="url"
                    value={newBlogImageUrl}
                    onChange={(e) => setNewBlogImageUrl(e.target.value)}
                    placeholder="Blog image URL (https://...)"
                    className={styles.blogInput}
                  />
                  {newBlogImageUrl ? (
                    <div className={styles.blogImagePreviewWrap}>
                      <img src={newBlogImageUrl} alt="Blog preview" className={styles.blogImagePreview} />
                    </div>
                  ) : null}
                  <textarea
                    value={newBlogContent}
                    onChange={(e) => setNewBlogContent(e.target.value)}
                    placeholder="Blog content (full article text)"
                    className={styles.blogTextarea}
                    rows={10}
                  />
                </div>
                <div className={styles.formActions}>
                  <button
                    onClick={selectedBlog ? handleUpdateBlog : handleCreateBlog}
                    disabled={savingBlog || !newBlogTitle.trim() || !newBlogDescription.trim() || !newBlogContent.trim()}
                    className={styles.saveButton}
                  >
                    {savingBlog ? 'Saving...' : selectedBlog ? 'Update Blog' : 'Create Blog'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={savingBlog}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {blogsLoading && (
              <div className={styles.loading}>Loading blogs...</div>
            )}

            {!blogsLoading && !isEditingBlog && (
              <>
                {blogs.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No blogs found. Create your first blog above.</p>
                  </div>
                ) : (
                  <div className={styles.blogsList}>
                    {blogs.map((blog) => (
                      <div key={blog._id} className={styles.blogCard}>
                        {blog.imageUrl ? (
                          <div className={styles.blogCardImageWrap}>
                            <img src={blog.imageUrl} alt={blog.title} className={styles.blogCardImage} />
                          </div>
                        ) : null}
                        <div className={styles.blogCardContent}>
                          <h3 className={styles.blogCardTitle}>{blog.title}</h3>
                          <p className={styles.blogCardDescription}>{blog.description}</p>
                          <p className={styles.blogCardDate}>
                            {formatDate(blog.createdAt)}
                          </p>
                        </div>
                        <div className={styles.blogCardActions}>
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className={styles.editButton}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

