import Topbar from "./Topbar";
export default function Layout({ children }) {
  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
}
