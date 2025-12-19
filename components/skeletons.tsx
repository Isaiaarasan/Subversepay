export function NavbarSkeleton() {
  return (
    <nav className="border-b bg-background w-full flex justify-center border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-5xl flex h-14 items-center justify-between px-4">
        <div className="mr-6 flex items-center space-x-2 font-bold">
          <span>Subverse Pay</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Toggle Placeholder */}
          <div className="h-9 w-9 rounded-md bg-muted/50 animate-pulse" />
          {/* Buttons Placeholder */}
          <div className="h-9 w-16 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-9 w-24 rounded-md bg-muted/50 animate-pulse" />
        </div>
      </div>
    </nav>
  );
}