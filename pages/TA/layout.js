import Topbar from "./Topbar";
export default function Layout({ children }) {
  console.log(children);
  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
}
