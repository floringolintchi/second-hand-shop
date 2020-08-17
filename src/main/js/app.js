'use strict';

//dasdasdad

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const root = '/api';
const follow = require('./follow');
const when = require('when');
const stompClient = require('./websocket-listener');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {desktops: [], attributes: [], pageSize: 2, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
        this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
	}

	updatePageSize(pageSize) {
    	if (pageSize !== this.state.pageSize) {
    		this.loadFromServer(pageSize);
    	}
    }

    onUpdate(desktop, updatedDesktop) {
        client({
        	method: 'PUT',
        	path: desktop.entity._links.self.href,
        	entity: updatedDesktop,
        	headers: {
        		'Content-Type': 'application/json',
        		'If-Match': desktop.headers.Etag
        	}
        }).done(response => {
        	this.loadFromServer(this.state.pageSize);
       	}, response => {
       		if (response.status.code === 412) {
       			alert('DENIED: Unable to update ' +
       				desktop.entity._links.self.href + '. Your copy is stale.');
       		}
       	});
    }

    onDelete(desktop) {
    		client({method: 'DELETE', path: desktop.entity._links.self.href});
    	}

	onNavigate(navUri) {
		client({
				method: 'GET',
				path: navUri
			    		}).then(desktopCollection => {
    			this.links = desktopCollection.entity._links;
    			this.page = desktopCollection.entity.page;

    			return desktopCollection.entity._embedded.desktops.map(desktop =>
    					client({
    						method: 'GET',
    						path: desktop._links.self.href
    					})
    			);
    		}).then(desktopPromises => {
    			return when.all(desktopPromises);
    		}).done(desktop => {
    			this.setState({
    				page: this.page,
    				desktops: desktops,
    				attributes: Object.keys(this.schema.properties),
    				pageSize: this.state.pageSize,
    				links: this.links
    			});
    		});
		}


	onCreate(newDesktop) {
    	follow(client, root, ['desktops']).done(response => {
    		client({
    			method: 'POST',
    			path: response.entity._links.self.href,
    			entity: newDesktop,
    			headers: {'Content-Type': 'application/json'}
    		})
    	})
    }

	loadFromServer(pageSize) {
    	follow(client, root, [
    		{rel: 'desktops', params: {size: pageSize}}]
    	).then(desktopCollection => {
    		return client({
    			method: 'GET',
    			path: desktopCollection.entity._links.profile.href,
    			headers: {'Accept': 'application/schema+json'}
    		}).then(schema => {
    			this.schema = schema.entity;
    			this.links = desktopCollection.entity._links;
    			return desktopCollection;
    		});
    	}).then(desktopCollection => {
    		return desktopCollection.entity._embedded.desktops.map(desktop =>
    				client({
    					method: 'GET',
    					path: desktop._links.self.href
    				})
    		);
    	}).then(desktopPromises => {
    		return when.all(desktopPromises);
    	}).done(desktops => {
    		this.setState({
    			desktops: desktops,
    			attributes: Object.keys(this.schema.properties),
    			pageSize: pageSize,
    			links: this.links
    		});
    	});
	}


	refreshAndGoToLastPage(message) {
    	follow(client, root, [{
    		rel: 'desktops',
    		params: {size: this.state.pageSize}
    	}]).done(response => {
    		if (response.entity._links.last !== undefined) {
    			this.onDesktopNavigate(response.entity._links.last.href);
    		} else {
    			this.onDesktopNavigate(response.entity._links.self.href);
    		}
    	})
    }

    refreshCurrentPage(message) {
    	follow(client, root, [{
    		rel: 'desktops',
    		params: {
    			size: this.state.pageSize,
    			page: this.state.page.number
    		}
    	}]).then(desktopCollection => {
    		this.links = desktopCollection.entity._links;
    		this.page = desktopCollection.entity.page;

    		return desktopCollection.entity._embedded.desktops.map(desktop => {
    			return client({
    				method: 'GET',
    				path: desktop._links.self.href
    			})
    		});
    	}).then(desktopPromises => {
    		return when.all(desktopPromises);
    	}).then(desktops => {
    		this.setState({
    			page: this.page,
    			desktops: desktops,
    			attributes: Object.keys(this.schema.properties),
    			pageSize: this.state.pageSize,
    			links: this.links
    		});
    	});
    }

	componentDidMount() {
    		this.loadFromServer(this.state.pageSize);
    		stompClient.register([
    			{route: '/topic/newDesktop', callback: this.refreshAndGoToLastPage},
    			{route: '/topic/updateDesktop', callback: this.refreshCurrentPage},
    			{route: '/topic/deleteDesktop', callback: this.refreshCurrentPage}
    		]);
    	}

	render() {
    		return (
    			<div>
    				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
    				<DesktopList desktops={this.state.desktops}
    							  links={this.state.links}
    							  pageSize={this.state.pageSize}
    							  attributes={this.state.attributes}
    							  onNavigate={this.onNavigate}
    							  onUpdate={this.onUpdate}
    							  onDelete={this.onDelete}
    							  updatePageSize={this.updatePageSize}/>
    			</div>
    		)
    	}
}

class DesktopList extends React.Component{

    constructor(props) {
    		super(props);
    		this.handleNavFirst = this.handleNavFirst.bind(this);
    		this.handleNavPrev = this.handleNavPrev.bind(this);
    		this.handleNavNext = this.handleNavNext.bind(this);
    		this.handleNavLast = this.handleNavLast.bind(this);
    		this.handleInput = this.handleInput.bind(this);
    	}

    handleInput(e) {
        	e.preventDefault();
        	const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        	if (/^[0-9]+$/.test(pageSize)) {
        		this.props.updatePageSize(pageSize);
        	} else {
        		ReactDOM.findDOMNode(this.refs.pageSize).value =
        			pageSize.substring(0, pageSize.length - 1);
        	}
        }

    handleNavFirst(e){
    	e.preventDefault();
    	this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
    	e.preventDefault();
    	this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
    	e.preventDefault();
    	this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
    	e.preventDefault();
    	this.props.onNavigate(this.props.links.last.href);
    }

	render() {
    		const desktops = this.props.desktops.map(desktop =>
    			<Desktop key={desktop.entity._links.self.href}
    					  desktop={desktop}
    					  attributes={this.props.attributes}
    					  onUpdate={this.props.onUpdate}
    					  onDelete={this.props.onDelete}/>
    		);

    		const navLinks = [];
    		if ("first" in this.props.links) {
    			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
    		}
    		if ("prev" in this.props.links) {
    			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
    		}
    		if ("next" in this.props.links) {
    			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
    		}
    		if ("last" in this.props.links) {
    			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
    		}

    		return (
    			<div>
    				<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
    				<table class="fancytable">
    					<tbody>
    						<tr>
    							<th>Nume</th>
    							<th>Procesor</th>
    							<th>Descriere</th>
    							<th></th>
    							<th></th>
    						</tr>
    						{desktops}
    					</tbody>
    				</table>
    				<div>
    					{navLinks}
    				</div>
    			</div>
    		)
		}
	}

class Desktop extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.desktop);
	}

	render() {
    		return (
    			<tr>
    				<td>{this.props.desktop.entity.nume}</td>
    				<td>{this.props.desktop.entity.procesor}</td>
    				<td>{this.props.desktop.entity.descriere}</td>
    				<td>
    					<UpdateDialog desktop={this.props.desktop}
    								  attributes={this.props.attributes}
    								  onUpdate={this.props.onUpdate}/>
    				</td>
    				<td>
    					<button onClick={this.handleDelete}>Delete</button>
    				</td>
    			</tr>
    		)
    	}
}

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newDesktop = {};
		this.props.attributes.forEach(attribute => {
			newDesktop[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newDesktop);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<a href="#createDesktop">Create</a>

				<div id="createDesktop" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Add new desktop</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}



}

class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const updatedDesktop = {};
		this.props.attributes.forEach(attribute => {
			updatedDesktop[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.desktop, updatedDesktop);
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={this.props.desktop.entity[attribute]}>
				<input type="text" placeholder={attribute}
					   defaultValue={this.props.desktop.entity[attribute]}
					   ref={attribute} className="field"/>
			</p>
		);

		const dialogId = "updateDesktop-" + this.props.desktop.entity._links.self.href;

		return (
			<div key={this.props.desktop.entity._links.self.href}>
				<a href={"#" + dialogId}>Update</a>
				<div id={dialogId} className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Update a desktop</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Update</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

};

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

