class NotesController < ApplicationController
	def index
		@notes = Note.all
		render json: @notes.to_json
	end

	def create
		@note = Note.new(note_params)

		respond_to do |format|
      if @note.save
        format.html { redirect_to @note, notice: 'note was successfully created.' }
        format.json { render json: @note, status: :created, location: @note}
      else
        format.html { render :new }
        format.json { render json: @note.errors, status: :unprocessable_entity }
      end
    end
	end

	private

	def note_params
    params.require(:note).permit(:header, :content)
  end

end
