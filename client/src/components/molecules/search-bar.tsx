import React, { useState, useEffect } from 'react';
import { GetAllBeaconsQuery, useGetAllCategoriesQuery, useGetSearchResultsQuery} from "@/redux/api";

const SearchBar = ({ onSearchResults }) => {
  const { data: categories, error, isLoading, } = useGetAllCategoriesQuery();
  const [query, setQuery] = useState<GetAllBeaconsQuery | null>(null);
  const useGetAllBeaconsQUery = useGetSearchResultsQuery(query ?? {} as GetAllBeaconsQuery);
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Category');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories from server
  useEffect(() => {
    if (!categories) return;
    const res: { label: string; value: string }[] = [];

    for (let i = 0; i < categories.length; i++) {
      const name = categories[i].CategoryName.charAt(0).toUpperCase() + categories[i].CategoryName.substring(1);
      res.push({
        label: name,
        value: categories[i].CategoryId
      })
    }
    setCategoryOptions(res);
    
  }, [categories])


  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#dropdownButton') && !event.target.closest('#dropdownMenu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      searchQuery: searchQuery,
      selectedOption: selectedOption,
    };

    try {
      // Make the API request with the data
      const response = await fetch("http://localhost:5037/api/Beacons/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the server it's JSON
        },
        body: JSON.stringify(payload), // Send the data as a JSON string
      });

      if (response.ok) {
        const result = await response.json();
        onSearchResults(result);
      } else {
        console.log("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="relative mt-2">
        <div className="absolute top-1 left-1 flex items-center">
          <button
            id="dropdownButton"
            className="rounded border border-transparent py-1 px-1.5 text-center flex items-center text-sm transition-all text-slate-600"
            onClick={handleDropdownToggle}
          >
            <span id="dropdownSpan" className="text-ellipsis overflow-hidden">{selectedOption}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 ml-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <div className="h-6 border-l border-slate-200 ml-1"></div>
          {isOpen && (
            <div
              id="dropdownMenu"
              className="min-w-[150px] overflow-hidden absolute left-0 w-full mt-10 bg-white border border-slate-200 rounded-md shadow-lg z-10"
            >
              <ul id="dropdownOptions">
                {categoryOptions.length === 0 ? (
                  <li className="px-4 py-2 text-slate-600 text-xs">Loading...</li>
                ) : (
                  categoryOptions.map((categoryOptions) => (
                  <li
                    key={categoryOptions.label}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-xs cursor-pointer"
                    onClick={() => handleOptionSelect(categoryOptions.label)}
                  >
                    {categoryOptions.label}
                  </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        <input
          type="text"
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Item"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleSubmit}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 mr-1.5">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
