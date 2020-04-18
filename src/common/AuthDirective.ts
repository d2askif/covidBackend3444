/**
 * This is used to define roles for user access on the different elements
 * in the schema
 */
// @flow
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';

import { defaultFieldResolver } from 'graphql';
import User from '../db/Models/User';
/**
 * This defines the different states for a user
 */
/* eslint-disable import/prefer-default-export */
// @flow

export const UserStates = {
  CREATING: 'CREATING',
  ACTIVE: 'ACTIVE',
  NOT_ACTIVE: 'NOT_ACTIVE',
};

export const UserStatesArray = [
  UserStates.CREATING,
  UserStates.ACTIVE,
  UserStates.NOT_ACTIVE,
];

// eslint-disable-next-line no-undef

/**
 * This will check if the user should have access or not
 *
 * @param {user} user The user found
 * @param {string} requiredRole The role that is required for access
 */
export const correctRole = (user: any, requiredRole: string): boolean => {
  console.log('###ROLE');

  if (!user) {
    return false;
  }

  if (requiredRole === 'ALL') {
    return true;
  }

  if (requiredRole === 'USER') {
    return user.state === UserStates.ACTIVE;
  }

  if (requiredRole === 'SIGNUP') {
    return user.state === UserStates.CREATING;
  }

  return false;
};

/**
 * A directive that can be used in the schema to define a certain access role
 * for the user that wants access to it
 */
class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type: any) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field: any, details: any) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType: any) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) {
      return;
    }
    console.log('#########I am here');

    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async (args: any) => {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        if (!requiredRole) {
          console.log('CTX', args);

          return resolve.apply(this, args);
        }

        const [, , ctx] = args;

        if (ctx.user && correctRole(ctx.user, requiredRole)) {
          const result = await resolve.apply(this, args);
          return result;
        }

        throw new AuthenticationError(
          'You must be signed in to view this resource.'
        );
      };
    });
  }
}

export default AuthDirective;
