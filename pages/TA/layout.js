import Topbar from "./Topbar_TA";
export default function Layout({ children }) {
  console.log(children);
  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
}
