import { Meteor } from 'meteor/meteor';
import Customer from './collections/customers';

Meteor.methods({
    findCustomers() {
        return Customer.find().fetch();
    },
    insertCustomers(data) {
        Meteor._sleepForMs(2500);
        return Customer.insert(data);
    },
    removeCustomer(_id) {
        Meteor._sleepForMs(2000);
        return Customer.remove({ _id: _id });
    }
})