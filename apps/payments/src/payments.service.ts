import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY') || '');
  }
  async createCharge({amount}:CreateChargeDto){
    return this.stripe.paymentIntents.create({
      amount: amount*100,
      currency: 'usd',
      payment_method:'pm_card_visa',
      confirm: true,
    });
  }
}
