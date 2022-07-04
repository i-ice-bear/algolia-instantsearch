import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  SearchBox,
  DynamicWidgets,
  Panel,
  Highlight,
  RefinementList,
  Pagination,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';
import { connectAutoComplete } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

function App({ hits, currentRefinement, refine }) {
  return (
    <div>
      <header className="header">
        <h2>Mini store</h2>
        <ul className="nav-content">
          <li><a href="https://algolia.com">Home</a></li>
          <li><a href="https://algolia.com">Cool searches 😎</a></li>
          <li><a href="https://algolia.com">InstantSearch 👾</a></li>
          <li><a href="https://algolia.com">Algolia ai</a></li>
        </ul>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="instant_search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
        >
          <Configure hitsPerPage={8} />
          <Configure distinct={1} />
          <div className="search-panel">
            <div className="search-panel__filters">
              <div className="brand-section">
              <h1>Brands</h1>
              <RefinementList className="ul-list"  attribute="brand" />
              <Configure  hitsPerPage={8} />
              <DynamicWidgets fallbackWidget={RefinementList}></DynamicWidgets>
              </div>
            </div>

            <div className="search-panel__results">
              <SearchBox
                className="searchbox"
                translations={{
                  placeholder: 'Search your products like a pro...  😎',
                }}
              />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

function Hit(props) {
  return (
    <article className="card-container">
      <div className="content">
        <img
          src={props.hit.image}
          align="left"
          alt={props.hit.name}
          className="display-image"
        />
        <div className="hit-name">
          <h1>
            <Highlight attribute="name" hit={props.hit} />
          </h1>
        </div>
        <div className="hit-description">
          <Highlight attribute="description" hit={props.hit} />
        </div>
        <button className="add-to-cart">Add to cart</button>
        <button className="add-to-buy">Buy now</button>
        <div className="hit-price">${props.hit.price}</div>
      </div>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;

const CustomAutocomplete = connectAutoComplete(App);
