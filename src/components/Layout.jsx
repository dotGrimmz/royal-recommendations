export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-shrink-0 bg-primary text-white text-center p-4">
        <h1 className="text-xl font-bold">Royal Suggestions</h1>
      </header>
      <main className="flex-grow overflow-y-auto p-4">{children}</main>
      <footer className=" flex-shrink-0 bg-primary text-white text-center p-4">
        Royal Recommendations <span>&copy;</span>
      </footer>
    </div>
  );
};
