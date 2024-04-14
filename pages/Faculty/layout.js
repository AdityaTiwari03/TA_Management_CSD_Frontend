import Topbar from "./Topbar_Faculty";
export default function Layout({ children }) {
  console.log(children);
  return (
    <div className="h-screen w-screen">
      <Topbar />
      <main className="h-full mt-8">{children}</main>
    </div>
  );
}
