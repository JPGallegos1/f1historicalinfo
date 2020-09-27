import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAll } from "../../services/seasonsFetchers";
import { Season } from "../../components/seasons/season";
import { Title } from "../../components/layout/title";
import { SimpleButton } from "../../components/layout/buttons";

const Seasons = ({ seasons }) => {
  const [seasonYear, setSeasonYear] = useState(seasons[0].season);

  const router = useRouter();

  useEffect(() => {
    const year = router.query.year ? router.query.year : seasons[seasons.length - 1].season;
    setSeasonYear(year);
  }, [])

  const handleChange = e => setSeasonYear(e.target.value);
  
  const handleClick = e => {
    const season = {
      minus: setSeasonYear(prevState => parseInt(prevState) - 1),
      plus: setSeasonYear(prevState => parseInt(prevState) + 1)
    };
    return season[e];
  };

  //const handleClick = e => {
    //switch (e) {
      //case "minus":
        //setSeasonYear(prevState => parseInt(prevState) - 1);
        //break;
      //case "plus":
        //setSeasonYear(prevState => parseInt(prevState) + 1);
        //break;
    //}
  //};

  return (
    <div>
      <div>
        <Title title="Seasons" />
        <div className="flex justify-center">
          <SimpleButton text="-" handleClick={() => handleClick("minus")} />
          <input
            type="text"
            min={seasons[0].season}
            max={seasons[seasons.length - 1].season}
            step="1"
            className="appearance-none focus:outline-none py-3 bg-f1-gray text-f1-white text-center text-xl focus:shadow-md transition-all ease-in-out duration-300"
            value={seasonYear}
            onChange={handleChange}
            readOnly
          />
          <SimpleButton text="+" handleClick={() => handleClick("plus")} />
        </div>
        <div className="sm:mt-10 mt-5 flex justify-center items-center">
          <Season year={seasonYear} />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { Seasons } = await getAll("seasons");
  const seasons = Seasons;

  return {
    props: {
      seasons
    }
  };
}

export default Seasons;
