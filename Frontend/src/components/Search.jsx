import { GoSearch } from "react-icons/go";
import "./Css/search.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearchValue } from "../features/otherUserInfoSlice";
import "./Css/animation.css";

const Search = () => {
  const dispatch = useDispatch();
  const [search, setsearch] = useState({ name: "" });
  const onChange = (e) => {
    setsearch({ ...search, [e.target.name]: e.target.value });
  };
  const onSearch = async () => {
    await dispatch(updateSearchValue(search.name));
  };
  return (
    <>
      <div className="group max-[400px]:w-[95%] font-roboto">
        <div className="search-icon" onClick={onSearch}>
          <GoSearch />
        </div>
        <input
          id="search"
          className="input"
          type="text"
          value={search.name}
          name="name"
          placeholder="Search The User By Name..."
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Search;
