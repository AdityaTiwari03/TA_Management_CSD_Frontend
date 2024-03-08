import Topbar from "./Topbar";
export default function TALayout({ children }) {
  console.log(children);
  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
}
