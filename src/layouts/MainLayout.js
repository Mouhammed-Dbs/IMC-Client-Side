import MainNavbarNavbar from "@/components/MainNavbar";

export default function MainLayout(props) {
  return (
    <div className="w-screen fixed">
      <MainNavbarNavbar />
      <main className="w-full h-full">{props.children}</main>
    </div>
  );
}
