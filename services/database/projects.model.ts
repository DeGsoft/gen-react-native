import { TODO_TABLE, relations } from './database';

import Model from './model';
import Todos from './todos.model';

relations.setRelationshipDefinition(
    'projectTodos',  // the id of the relationship
    TODO_TABLE,         //  the 'many', or local side of the relation
    'projects',      //  the 'one', or remote side of the relation
    'projectId'      //  the local key containing the remote id
);

const Projects = (() => {
    const baseProjects = Model('projects');

    const byId = (projectId) => {
        const project = baseProjects.byId(projectId);
        project.todos = relations.getLocalRowIds('projectTodos', projectId)
            .map(Todos.byId);

        return project;
    };

    return {
        ...baseProjects,
        byId
    }
})();

export default Projects;
