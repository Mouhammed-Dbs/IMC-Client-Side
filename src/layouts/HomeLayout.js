import Navbar from "@/components/Navbar";

export default function HomeLayout(props) {
  return (
    <div className="h-screen">
      <Navbar />
      <main className="w-full h-full">{props.children}</main>
    </div>
  );
}
