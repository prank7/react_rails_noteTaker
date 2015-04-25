//Structure
// - NoteList
// 	- Notes 
// 		-header
// 		-content
// -NoteForm

var data = [{"header": "A Loveletter To J"}, {"header": "A letter to my future self"}]

var Note = React.createClass({
	render: function(){
		return(
			<div className ="note well">
				{this.props.header}
			</div>
		);
	}
});

var NoteList = React.createClass({
	render: function(){
		var notes = this.props.notes.map(function(note, index){
			return (
				<Note header={note.header} />
			);
		});
		return(
			<div className="NoteList col-md-6">
				{notes}
			</div>
		);
	}
});

var NoteBox = React.createClass({
	getInitialState: function(){
		return {notes: []};
	},
	componentDidMount: function(){
		this.loadNotesFromServer();
		setInterval(this.loadNotesFromServer, this.props.pollInterval);
	},
	loadNotesFromServer: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(notes){
				this.setState({notes: notes});
			}.bind(this),
			error: function(xhr, status, err){
          console.error(this.props.url, status, err.toString());
      }.bind(this)
		});
	},
	handleNoteSubmit: function(note){
		var allNotes = this.state.notes;
		var newNotes = allNotes.push(note);
		this.setState({notes: newNotes});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: {"note": note},
			success: function(data) {
          this.loadNotesFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
		});
	},
	render: function(){
		return(
			<div className="noteBox col-md-12">
				<h3>Notes</h3>
				<NoteList notes={this.state.notes} />
				<NoteForm onNoteSubmit={this.handleNoteSubmit} />
			</div>
		);
	}
});

var NoteForm = React.createClass({
	handleSubmit: function(){
		var header = this.refs.header.getDOMNode().value.trim();
		var postcontent = this.refs.postcontent.getDOMNode().value.trim();
		this.props.onNoteSubmit({header: header, content: postcontent});
		this.refs.header.getDOMNode().value = '';
    this.refs.postcontent.getDOMNode().value = '';
		return false;
	},
	render: function(){
		return(
			<div className="noteForm col-md-6">
				<form onSubmit={this.handleSubmit}>
					<h3>Create a new Note</h3>
					<input type="text" className="form-control" placeholder="Header" ref="header" />
					<br/>
					<textarea className ="form-control" placeholder="Content" rows="10" ref="postcontent"></textarea>
					<br/>
					<input type="submit" value="Post" className="btn btn-success pull-right" />
				</form>
			</div>
		);
	}
});




// var ready = function(){
// 	React.render(<NoteBox url="/notes" pollInterval={2000} />, 
// 		document.getElementById('notes'));
// };

// $(document).ready(ready);

