"use client";

import { MaterialIcon } from "@/app/components/material-icon";
import {
  MATERIAL_ICON_OPTIONS,
  type MaterialIconName,
} from "@/app/lib/material-icons";
import styles from "../adminpage.module.scss";

type Props = {
  value: string;
  onChange: (name: MaterialIconName) => void;
  /** Optional id prefix for radio grouping when multiple pickers are on the page */
  name?: string;
};

export function MaterialIconPicker({ value, onChange, name = "material-icon" }: Props) {
  return (
    <div className={styles.iconPicker} role="radiogroup" aria-label="Material icon">
      {MATERIAL_ICON_OPTIONS.map((opt) => {
        const selected = value === opt.name;
        return (
          <button
            key={opt.name}
            type="button"
            role="radio"
            aria-checked={selected}
            title={opt.label}
            className={`${styles.iconPickerOption} ${selected ? styles.iconPickerOptionSelected : ""}`}
            onClick={() => onChange(opt.name)}
          >
            <MaterialIcon name={opt.name} className={styles.iconPickerGlyph} />
            <span className={styles.iconPickerLabel}>{opt.label}</span>
            <input
              type="radio"
              name={name}
              value={opt.name}
              checked={selected}
              onChange={() => onChange(opt.name)}
              className={styles.iconPickerInput}
              tabIndex={-1}
            />
          </button>
        );
      })}
    </div>
  );
}
