export const Artist = () => {
  const url = new URL(`file:///${location.hash.slice(1)}`);

  return (
    <>
      <h1 style={{ marginTop: 0 }}>{url.searchParams.get('artist')}</h1>
      <section>
        <h2>Albums</h2>
      </section>
      <section>
        <h3>Singles</h3>
      </section>
    </>
  );
};
