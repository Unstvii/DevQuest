const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="mb-6 flex items-center gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary" />
      </div>

      <p className="text-sm text-muted-foreground">Just a moment...</p>

      <p className="mt-1 text-xs text-muted-foreground/60">
        Waking up the database
      </p>
    </div>
  );
};

export default Loader;
