export default function Searchbar({
  handleSearchChange,
}: {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form
      method="post"
      className="w-full relative flex justify-center items-center"
    >
      <input
        type="text"
        placeholder="Search for a tag or a username"
        className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
        onChange={handleSearchChange}
      />
    </form>
  );
}
