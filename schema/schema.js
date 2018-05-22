const graphql = require('graphql');
const {
      GraphQLString,
      GraphQLBoolean,
      GraphQLFloat,
      GraphQLID,
      GraphQLList,
      GraphQLInt,
      GraphQLObjectType, 
      GraphQLSchema,
      GraphQLNonNull
} = graphql ;

var teachers = [
                {id: 1, firstName: 'Amine', lastName: 'Mahamat', age: 27, email: 'amine@mail.com', gender: 'male'},
                { id: 2, firstName: 'Saad', lastName: 'Amine', age: 24, email: 'saad@mail.com', gender: 'male' },
                { id: 3, firstName: 'Jhon', lastName: 'Doe', age: 25, email: 'jhon@mail.com', gender: 'male' },
                { id: 4, firstName: 'Fatma', lastName: 'Ali', age: 27, email: 'fatma@mail.com', gender: 'female' }
   ];

const subjects = [{id : 1, name: 'Geo', points: 100,  _tId : 1},
                  { id: 2, name: 'Hist', points: 100, _tId: 1 },
                  { id: 3, name: 'Math', points: 150, _tId: 3 },
                  { id: 4, name: 'Phy', points: 150, _tId: 4 },
                  { id: 5, name: 'Law', points: 100, _tId: 2 },
                  { id: 6, name: 'Sports', points: 100, _tId: 4 },
                  { id: 7, name: 'Sports for Women', points: 100, _tId: 4 },
]
/** we install express, graphql, express-graphql */

/*** Teacher object **
 * SDL, data members and data types
*/

const TeacherType = new GraphQLObjectType({
    name: 'Teacher',
    description: 'this is the Teacher object schema with its data types and fields',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        age: { type: GraphQLInt },
        subjects: {
            type: GraphQLList(SubjectType),
            resolve: (parent, args) => {
                let _subjects = subjects.filter((s) => s._tId == parent.id);
                return _subjects;
            }
        }
    })

});
const SubjectType = new GraphQLObjectType({
    name: 'Subject',
    description: 'this is the subject schema',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        points: {type: GraphQLInt},
        teacher: {type: TeacherType, 
            resolve: (parent, args) => {
               
                let teacher = teachers.find((t) => t.id == parent._tId);
                return teacher;
            }
        }
    })
});

/**** schema ends ****/

/**** Root Query ****/
const RootQuery = new GraphQLObjectType ({
    name : 'RootQueryType',
    description: 'Root Query for the main app',
    fields: {
        teacher: {
                    type: TeacherType,
                    args: {
                        id :  {type: GraphQLID},
                        name: {type: GraphQLString}
                    },
                    resolve: (parent, args) => {
                      
                       let _teacher = teachers.find( (t) => t.id == args.id);
                       return _teacher ;
                    }
                },
        subject: {
            type: SubjectType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                console.log('adding ...');
                let instance = { id: 5, name: 'Geo', points: 100, _tId: 1 };
                subjects.push(instance);
                console.log(subjects)
                let _subject = subjects.find((_s) => _s.id == args.id);
                return _subject;
            }
        }
    }
});

/**** root query ends ****/

/***** mutations ********/
const Mutation = new GraphQLObjectType({
    name: "Mutations",
    description: 'manipulating data via these mutations',
    fields: {
        addTeacher: {
            type: TeacherType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                firstName: { type: GraphQLString },
                // lastName: { type: GraphQLString },
                // email: { type: GraphQLString },
                // gender: { type: GraphQLString },
                // age: { type: GraphQLInt },
            },
            resolve: (parent, args) => {
                let _newTeacherInstance = new Object();
                _newTeacherInstance.id = args.id;
                _newTeacherInstance.firstName = args.firstName;
                _newTeacherInstance.lastName = args.lastName;
                _newTeacherInstance.email = args.email;
                _newTeacherInstance.gender = args.gender;
                _newTeacherInstance.age = args.age;
                teachers.unshift(_newTeacherInstance);
                return _newTeacherInstance ;
            }
        },
        removeTeacher: {
            type: TeacherType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: (parent, args) => {
                teachers = teachers.filter((t) => t.id !== args.id);
                return teachers;
            }
        }
    }
})
module.exports = new GraphQLSchema ({
    query: RootQuery,
    mutation: Mutation
});