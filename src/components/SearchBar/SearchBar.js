import React from 'react';
import './SearchBar.css';
import Autocomplete from '../SearchBar/autocomplete'


class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.handleTermsChange = this.handleTermsChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.sortByOptions = {
            "Best Match": "best_match",
            "Highest Rated": "rating",
            "Most Reviewed": "review_count"
        };
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return '';
        }
    }

    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption }, () => {
            if (this.state.term && this.state.location) {
                this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            }
        });
    }

    handleTermsChange(e) {
        this.setState({
            term: e.target.value
        });
    }

    handleLocationChange(e) {
        this.setState({
            location: e.target.value
        });
    }

    handleSearch(e) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        e.preventDefault();
    }

    handleClick(e) {
        if (e.keyCode === 13 && this.state.term && this.state.location) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            e.preventDefault();
        }
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
        })
    }


    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onKeyUp={this.handleClick.bind(this)} onChange={this.handleTermsChange} placeholder="Search Businesses" />
                    {/* {<input onKeyUp={this.handleClick.bind(this)} onChange={this.handleLocationChange} placeholder="Where?" />} */}
                    <Autocomplete />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;