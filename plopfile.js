module.exports = function (plop) {
    plop.setGenerator('simple-plop-generator', {
        description: 'Simple Plop Generator',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Component name',
        }],
        actions: [{
            type: 'addMany',
            base: 'plop-templates/component/',
            destination: 'components/{{name}}/',
            templateFiles: 'plop-templates/component/*',
        }]
    });
};