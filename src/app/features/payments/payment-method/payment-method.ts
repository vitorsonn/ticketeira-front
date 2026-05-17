import { Component, OnInit, inject, Input,signal } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { StripeService } from '../../../services/stripe-service';
import { TicketResponse } from '../../../services/stripe-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.css',
})
export class PaymentMethod implements OnInit {
  private stripeService = inject(StripeService);
  private router = inject(Router);

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: any;
  @Input() amount: number = 0;
  @Input() sectorId: number = 0;

  ticketResult = signal<TicketResponse | null>(null);
  pagamentoConcluido = signal(false);


async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51TQx11PU1Sqy0ScK03V1Mjzz24Vo02uu6WJoj0vGKPrzSgmIIgCXai9iDIhQwb5ELc0wYbQ4fPJIEKY6oXiTuArw00UbSyjUYy');

    this.stripeService.createPaymentIntent(this.amount).subscribe(async (clientSecret) => {
      if (this.stripe) {
        this.elements = this.stripe.elements({ clientSecret });
        this.cardElement = this.elements.create('payment');
        this.cardElement.mount('#payment-element');
      }
    });
  }

  async confirmarPagamento() {
    if (!this.stripe || !this.elements) return;



    const { error, paymentIntent } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?sectorId=${this.sectorId}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      console.error('Erro no pagamento:', error.message);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {

    console.log(`Pagamento aprovado! Gerando ticket para o setor: ${this.sectorId}`);

    this.stripeService.confirmPayment(paymentIntent.id, this.sectorId).subscribe({
      next: (res) => {
        this.ticketResult.set(res);
        this.pagamentoConcluido.set(true);
        this.router.navigate(['/payment-success'], {
            state: { data: res }
          });
        },
      error: (err) => {
        console.error('Erro ao confirmar no backend:',err);

      },
    });
  }
  }

}
