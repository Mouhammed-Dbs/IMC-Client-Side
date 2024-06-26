import MNavbar from "@/components/Navbar";

export default function HomeLayout(props) {
  return (
    <div className="h-screen">
      <MNavbar />
      <main className="w-full h-screen overflow-auto no-scrollbar ">
        {props.children}
      </main>
    </div>
  );
}
