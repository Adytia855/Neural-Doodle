const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 backdrop-blur-sm">
    <div
      className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-teal-400 to-indigo-500 animate-spin"
      style={{ animationDuration: "2s" }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-950 rounded-full">
        <div className="w-10 h-10 border-[6px] border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  </div>
);

export default Loader;
