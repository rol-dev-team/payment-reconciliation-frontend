// src/components/shared/DateRangePickerPopover.jsx
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { Box, Button, Stack, Typography, Divider } from "@mui/material";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SHORTCUTS = [
  {
    label: "Today",
    getRange: () => ({ startDate: startOfDay(new Date()), endDate: endOfDay(new Date()) }),
  },
  {
    label: "Last 3 Days",
    getRange: () => ({ startDate: startOfDay(subDays(new Date(), 2)), endDate: endOfDay(new Date()) }),
  },
  {
    label: "Last 7 Days",
    getRange: () => ({ startDate: startOfDay(subDays(new Date(), 6)), endDate: endOfDay(new Date()) }),
  },
  {
    label: "Last 30 Days",
    getRange: () => ({ startDate: startOfDay(subDays(new Date(), 29)), endDate: endOfDay(new Date()) }),
  },
];

/**
 * DateRangePickerPopover
 *
 * Props:
 *  - value: { startDate: Date | null, endDate: Date | null }
 *  - onChange: (range: { startDate: Date, endDate: Date }) => void
 *  - onApply: () => void
 *  - onReset: () => void
 */
export default function DateRangePickerPopover({ value, onChange, onApply, onReset }) {
  const [range, setRange] = useState([
    {
      startDate: value?.startDate || new Date(),
      endDate: value?.endDate || new Date(),
      key: "selection",
    },
  ]);
  const [activeShortcut, setActiveShortcut] = useState(null);

  const handleChange = (item) => {
    setRange([item.selection]);
    setActiveShortcut(null);
    onChange?.({
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
    });
  };

  const handleShortcut = (shortcut) => {
    const { startDate, endDate } = shortcut.getRange();
    const newRange = [{ startDate, endDate, key: "selection" }];
    setRange(newRange);
    setActiveShortcut(shortcut.label);
    onChange?.({ startDate, endDate });
  };

  const handleReset = () => {
    const defaultRange = [{ startDate: new Date(), endDate: new Date(), key: "selection" }];
    setRange(defaultRange);
    setActiveShortcut(null);
    onChange?.({ startDate: null, endDate: null });
    onReset?.();
  };

  const formattedStart = range[0].startDate ? format(range[0].startDate, "MMM d, yyyy") : "Start Date";
  const formattedEnd = range[0].endDate ? format(range[0].endDate, "MMM d, yyyy") : "End Date";

  return (
    <Box sx={{ display: "flex", minWidth: 0 }}>
      {/* ── Left Sidebar: Shortcuts ── */}
      <Box
        sx={{
          width: 120,
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          py: 1.5,
          px: 1,
          gap: 0.5,
          bgcolor: "#f8fafc",
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "#94a3b8", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", px: 0.5, mb: 0.5 }}
        >
          Quick Select
        </Typography>
        {SHORTCUTS.map((s) => (
          <Button
            key={s.label}
            size="small"
            onClick={() => handleShortcut(s)}
            variant={activeShortcut === s.label ? "contained" : "text"}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              fontSize: "0.75rem",
              fontWeight: activeShortcut === s.label ? 700 : 500,
              color: activeShortcut === s.label ? "#fff" : "#475569",
              bgcolor: activeShortcut === s.label ? "#3b82f6" : "transparent",
              borderRadius: 1.5,
              px: 1,
              py: 0.5,
              minWidth: 0,
              "&:hover": {
                bgcolor: activeShortcut === s.label ? "#2563eb" : "#f1f5f9",
              },
            }}
          >
            {s.label}
          </Button>
        ))}
      </Box>

      {/* ── Right: Calendar + Header + Actions ── */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Selected range summary */}
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ px: 1.5, py: 1 }}>
          <Box sx={{ px: 1, py: 0.25, borderRadius: 1, bgcolor: "#f1f5f9", border: "1px solid #e2e8f0" }}>
            <Typography variant="caption" sx={{ color: "#1e293b", fontWeight: 600, fontSize: "0.7rem" }}>
              {formattedStart}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>→</Typography>
          <Box sx={{ px: 1, py: 0.25, borderRadius: 1, bgcolor: "#f1f5f9", border: "1px solid #e2e8f0" }}>
            <Typography variant="caption" sx={{ color: "#1e293b", fontWeight: 600, fontSize: "0.7rem" }}>
              {formattedEnd}
            </Typography>
          </Box>
        </Stack>

        <Divider />

        {/* Single-month Calendar */}
        <Box
          sx={{
            "& .rdrCalendarWrapper": {
              fontFamily: "inherit",
              fontSize: "11px",
            },
            "& .rdrMonth": {
              width: "230px",
              padding: "0 8px 10px",
            },
            "& .rdrMonthAndYearWrapper": {
              height: "36px",
              paddingTop: 0,
            },
            "& .rdrDay": {
              height: "28px",
              lineHeight: "28px",
            },
            "& .rdrDayNumber": {
              top: 0,
              bottom: 0,
            },
            "& .rdrDayNumber span": {
              fontSize: "11px",
            },
            "& .rdrWeekDay": {
              fontSize: "10px",
              lineHeight: "26px",
            },
            "& .rdrStartEdge, & .rdrEndEdge, & .rdrInRange": {
              top: "3px",
              bottom: "3px",
            },
            "& .rdrDayToday .rdrDayNumber span:after": {
              background: "#3b82f6",
            },
            "& .rdrSelected, & .rdrInRange, & .rdrStartEdge, & .rdrEndEdge": {
              background: "#3b82f6",
            },
            "& .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span":
              { color: "#fff" },
            "& .rdrMonthPicker select, & .rdrYearPicker select": {
              fontSize: "11px",
              padding: "2px 14px 2px 4px",
            },
            "& .rdrNextPrevButton": {
              width: "20px",
              height: "20px",
              margin: "0 4px",
            },
          }}
        >
          <DateRange
            ranges={range}
            onChange={handleChange}
            months={1}
            direction="horizontal"
            showMonthAndYearPickers={true}
            showDateDisplay={false}
            rangeColors={["#3b82f6"]}
            moveRangeOnFirstSelection={false}
          />
        </Box>

        <Divider />

        {/* Actions */}
        <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ px: 1.5, py: 1 }}>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={handleReset}
            sx={{ color: "#64748b", borderColor: "#e2e8f0", textTransform: "none", fontSize: "0.75rem", py: 0.25 }}
          >
            Reset
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={onApply}
            sx={{ bgcolor: "#3b82f6", textTransform: "none", fontSize: "0.75rem", py: 0.25, "&:hover": { bgcolor: "#2563eb" } }}
          >
            Apply
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}