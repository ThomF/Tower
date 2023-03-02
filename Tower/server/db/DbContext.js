import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TicketSchema } from '../models/Ticket'
import { EventSchema } from '../models/Event'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Ticket = mongoose.model('Ticket', TicketSchema);

  Events = mongoose.model('Event', EventSchema);
}

export const dbContext = new DbContext()
