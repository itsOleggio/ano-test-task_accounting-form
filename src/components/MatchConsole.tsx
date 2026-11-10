import { type FC, useEffect, useRef, useState } from "react";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { MATCH_CONSOLE_ID, MATCH_LOG_LABEL } from "../constants";
import type { MatchLogEntry } from "../types/matchLogEntry";

interface Props {
  entries: MatchLogEntry[];
  onClear: () => void;
}

export const MatchConsole: FC<Props> = ({ entries, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const toggleLabel = isOpen ? "Скрыть консоль" : "Показать консоль";

  const handleClear = () => {
    onClear();
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (isOpen && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [isOpen, entries.length]);

  return (
    <>
      <Tooltip title={toggleLabel}>
        <IconButton
          ref={toggleRef}
          color="primary"
          aria-label={`${toggleLabel} (${entries.length})`}
          aria-expanded={isOpen}
          aria-controls={MATCH_CONSOLE_ID}
          onClick={() => setIsOpen((prev) => !prev)}
          sx={{ flexShrink: 0 }}
        >
          <Badge badgeContent={entries.length} color="primary" showZero>
            <TerminalIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      {isOpen && (
        <Tooltip title="Очистить консоль">
          <span>
            <IconButton aria-label="Очистить консоль" disabled={entries.length === 0} onClick={handleClear}>
              <DeleteSweepIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      <Box
        id={MATCH_CONSOLE_ID}
        ref={logRef}
        role="log"
        aria-label="Журнал сопоставлений"
        tabIndex={0}
        hidden={!isOpen}
        sx={{
          flex: "0 0 100%",
          boxSizing: "border-box",
          maxHeight: "min(160px, 25vh)",
          overflowY: "auto",
          padding: 1,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "grey.100",
          fontFamily: "monospace",
          fontSize: "0.875rem",
        }}
      >
        {entries.length === 0 && "Сопоставлений пока нет"}
        {entries.map(({ id, invoiceId, paymentId }) => (
          <div key={id}>
            {MATCH_LOG_LABEL} Object {`{invoiceId: "${invoiceId}", paymentId: "${paymentId}"}`}
          </div>
        ))}
      </Box>
    </>
  );
};
