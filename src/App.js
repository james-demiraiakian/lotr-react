import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

import CharacterList from './components/Characters/CharacterList';
import FilmList from './components/Films/FilmList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getFilms();
    getCharacters();
  }, []);

  const getFilms = async () => {
    const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/films`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await resp.json();
    const filmDataArray = data.map((f) => {
      return [
        f.title,
        f.title.toLowerCase().replace(/\s+/g, '-'),
        f.box_office_total,
        f.academy_award_nominations,
      ];
    });
    setFilms(filmDataArray);
    // Add your code here!
    // 1. Get data using fetch from https://the-one-api.dev/v2/movie/ (don't forget to set your header!)
    // 2. Transform the response so that films contains nested arrays of:
    //   - the film's title
    //   - the film's title "slugified" i.e. in all lower case, with words separated with dashes,
    //   - the box office total
    //   - academy award nominations
    // NOTE: make sure you look at the response from the server - it may not be consistent
    // [["The Lord of the Rings Series", "the-lord-of-the-rings-series", 2917, 30 ], ["The Hobbit Series", "the-hobit-series", 2932, 7]...]

    // 3. Set the resulting transformation as state using setFilms
    // 4. You'll know it works if the films show up on the page
    return [];
  };

  const getCharacters = async () => {
    const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/characters`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await resp.json();
    const charArray = data.map((c) => {
      return {
        name: c.name,
        dates: c.birth + ' - ' + c.death,
        wikiUrl: `https://en.wikipedia.org/wiki/${c.name}`,
      };
    });
    setCharacters(charArray);
    // const characterDataArray = characterData.map(c);
    // Add your code here!
    // 1. Get data using fetch from https://the-one-api.dev/v2/character/
    // 2. Update the response data with the key `dates` which is a combination of
    //    the `birth` key and the `death key` separated with a dash. If neither date
    //    is provided, it should hold the string 'Unknown'
    //    [
    //       {name: 'Adanel', birth: "", death: "", dates: "Unknown", ...},
    //       {name: 'Adrahil I', birth: "Before , TA 1944", death: "Late , Third Age", dates: "Before , TA 1944 - Late , Third Age", ...},
    //       {name: 'Adrahil II', birth: "TA 2917", death: "TA 3010, dates: "TA 2917 - TA 3010", ...},
    //    ]
    // 3. Set the resulting transformation as state using setCharacters
    // 4. You'll know it works if the characters show up on the page
    return [];
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/films" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
        </header>
        <Switch>
          <Route path="/characters">
            <CharacterList characters={characters} />
          </Route>
          <Route path="/films">
            <FilmList films={films} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
