# name: discourse-landing-redirect
# about: Redirect /my-react-page to GitHub Pages build
# version: 0.1
# authors: Emad Cheshmazar
# url: https://github.com/emadcheshmazar/discourse-landing-build

after_initialize do
  Discourse::Application.routes.append do
    get '/my-react-page' => 'landing_redirect#show'
  end

  module ::LandingRedirect
    class LandingController < ::ApplicationController
      def show
        redirect_to 'https://emadcheshmazar.github.io/discourse-landing-build/'
      end
    end
  end
end
