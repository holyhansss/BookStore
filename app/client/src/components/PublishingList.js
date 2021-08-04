import React, { Component } from "react";
import PublishingListItem from "./PublishingListItem";

class PublishingList extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body p-5">
                    <h3>Publishing List</h3>
                        <table className="table mt-4">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Copies</th>
                                <th>Published</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.props.list.map(item => <PublishingListItem item={item} key={item.id}/> )}
                                
                            </tbody> 
                        </table>
                </div>
            </div>
        );

}


}

export default PublishingList;
