import * as React from "react";
import { connect } from "react-redux";
import email_icon from './email_icon.png';
import pdf_icon from './pdf_icon.png';
import './styles.scss'

import { goSearch, updateSearch } from "../../../actions/search";

interface IProps {
    updateSearchConnect: (event) => void;
    searchConnect: (term, username) => void;
    term: string;
    rows: any;
    username: string;
}

const Search = ({ updateSearchConnect, searchConnect, term, username, rows}: IProps) => (
    <div className="search">
        
        {!rows || rows.length < 1 ?
            (<h2>If I'm gonna find what you want I'll need some more information</h2>) :
            (<h2>I have found {rows.length} potential suspects</h2>)}

        <input
            name="text"
            type="text"
            placeholder="Search"
            onChange={updateSearchConnect}
        />

        <button onClick={() => searchConnect(term, username)}>Search</button>

        {rows && rows.length > 0 ?
            (<table className="results">
                <thead>
                    <tr>
                        <th>Recieved Date/Time</th>
                        <th>Matched Terms</th>
                        <th>Email Subject</th>
                        <th>Link to Email</th>
                        <th>Link to Pdf Page</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.recievedDateTime}</td>
                            <td dangerouslySetInnerHTML={row.highlights}></td>
                            <td>{row.subject}</td>
                            <td><a href={row.email} target="_blank"><img src={email_icon} className="thumbnail" /></a></td>
                            <td><a href={row.pdf} target="_blank" ><img src={pdf_icon} className="thumbnail" /></a></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                </tfoot>
            </table>) :
            (<></>)}
    </div>
);

const mapStateToProps = (state) => {
    return {
        term: state.search.term,
        rows: state.search.rows,
        username: state.login.username
    }
};

const mapDispatchToProps = {
    updateSearchConnect: updateSearch,
    searchConnect: goSearch
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);
