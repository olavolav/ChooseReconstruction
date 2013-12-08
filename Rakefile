desc "Build compiled and minified JavaScript"
task :javascript do
  puts "--- Compiling JavaScript file(s) ---"
  sh "juicer merge -i -s --force choice_tree.js"
end

desc "Build CSS from SCSS sources"
task :css do
  puts "--- Compiling CSS file(s) ---"
  sh "compass compile"
end

desc "Remove compiled files"
task :clean do
  sh "rm choice_tree.min.js choice_tree.css"
end


desc "Compile everything"
task :all => [:javascript, :css]

task :default => :all
