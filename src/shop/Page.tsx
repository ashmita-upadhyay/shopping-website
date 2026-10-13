import HeroSection from "../components/Home";
import Products from "../components/Products";

type PageProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Page({ search, setSearch }: PageProps) {
  return (
    <>
      <HeroSection />
      <Products search={search} setSearch={setSearch} />
    </>
  );
}