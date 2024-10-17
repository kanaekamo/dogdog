"use client"

import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header className="bg-black text-2xl font-bold pt-8 pb-8 pl-40 pr-40">
      <div>
        <h1>Cute Dog Images</h1>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="">
      <figure>
        <img src={props.src} alt="cute dog!" />
      </figure>
    </div>
  );
}

function Loading() {
  return (
    <div className="pt-8 pb-8 pl-40 pr-40 bg-white text-black">
      <p>Loading...</p>
    </div>
  );
}

function Gallery(props) {
  const { urls } = props;
  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      console.log(urls);
    });
  }, []);
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="pt-8 pb-8 pl-40 pr-40 bg-white grid grid-cols-4 gap-4">
      {urls.map((url) => {
        return (
          <div key={url}>
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
    <div className="pt-8 pl-40 pr-40 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center">
        <select name="breed" defaultValue="shiba" className="text-black text-xs border p-2 w-full">
          <option value="shiba">Shiba</option>
          <option value="akita">Akita</option>
        </select>
        <div className="bg-black text-white text-xs p-2 border">
          <button type="submit" className="button is-dark">
            Reload
          </button>
        </div>
      </form>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section>
        <div>
        <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section>
        <div>
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-200 pt-8 pb-16">
      <div className="text-sm text-center">
        <p className="text-black m-4">
          Dog images are retrieved from Dog API
        </p>
        <p className="text-blue-500">
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;