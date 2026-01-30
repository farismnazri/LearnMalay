{
  echo "# LearnMalay Project Map"
  echo
  echo "## Directories (exclude generated)"
  find learn-malay -maxdepth 4 -type d \
    -not -path "*/node_modules*" \
    -not -path "*/.next*" \
    -not -path "*/.git*" \
    -print
  echo
  echo "## Files (exclude generated)"
  find learn-malay -maxdepth 4 -type f \
    -not -path "*/node_modules*" \
    -not -path "*/.next*" \
    -not -path "*/.git*" \
    -print
} > learn-malay/PROJECT_MAP.md
