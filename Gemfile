source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec jekyll serve`.

# gem "jekyll", "~> 4.3.3"
gem "jekyll", "~> 4.4.0"

# This is the default theme for new Jekyll sites. You may change this to any other Jekyll-compatible theme.
# gem "minima", "~> 2.5"

# If you want to use GitHub Pages, remove the "gem "jekyll"
# above and uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-boosting gems if you are running Jekyll on Ruby 2.5+
gem "webrick", "~> 1.7" if RUBY_VERSION >= "2.5"

# Lock "html-pipeline" to 2.14.0 to avoid dependency conflicts with GitHub Pages.
# gem "html-pipeline", "~> 2.14.0"
