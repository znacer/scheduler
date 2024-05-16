  public intersect(other: TaskElement) {
    const inter = (a: TaskElement, b: TaskElement) => ((a.start <= b.start) && (a.end >= b.end) && (a.start !== b.start || a.end !== b.end));
    return inter(this, other) || inter(other, this);
  }
