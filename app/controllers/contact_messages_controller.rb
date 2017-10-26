class ContactMessagesController < InheritedResources::Base

  respond_to :html

  def new
    @contact_message = ContactMessage.new
  end

  def create
    @contact_message = ContactMessage.new(contact_message_params)

    respond_to do |format|
      if @contact_message.save

        format.html { redirect_to @contact_message, notice: 'Contact Message was successfully created.' }
        format.json { render :show, status: :created, location: @contact_message }
      else
        format.html { render :new }
        format.json { render json: @contact_message.errors, status: :unprocessable_entity }
      end
    end  end

  private

    def contact_message_params
      params.require(:contact_message).permit()
    end

end

