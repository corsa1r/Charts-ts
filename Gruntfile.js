module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["src/**/*.ts"],
                outDir: 'build/',
                options: {
                    module: "commonjs"
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'dist/dist.js': ['build/App.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.ts'],
                tasks: ['ts', 'browserify']
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["ts", "browserify"]);
};