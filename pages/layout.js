export default function Layout({ children }) {
  console.log(children);
  return (
    <>
      <main>{children}</main>
    </>
  );
}
