export default function PageLoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-40">
      <div className="relative flex justify-center items-center">
        <div className="border-ai-gradient w-16 h-16 rounded-full animate-spin" />
        <span className="absolute w-2 h-2 bg-amber-500 rounded-full shadow-md animate-ping"></span>
      </div>
    </div>
  );
}
