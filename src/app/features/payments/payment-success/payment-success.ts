import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from '../../../services/stripe-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
  imports: [RouterLink],
})
export class PaymentSuccess implements OnInit {
  private stripeService = inject(StripeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  status = signal<'loading' | 'success' | 'error'>('loading');
  ticketDetails = signal<any>(null);
  paymentIntentId: string | null = null;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state?.['data'];

    if (stateData) {
      this.ticketDetails.set(stateData);
      this.status.set('success');
    } else {
      this.status.set('error');
    }
  }

  ngOnInit() {

    if (this.status() === 'success') return;

    this.paymentIntentId = this.route.snapshot.queryParamMap.get('payment_intent');
    const statusParam = this.route.snapshot.queryParamMap.get('redirect_status');

    console.log('ID capturado da URL:', this.paymentIntentId);

    if (this.paymentIntentId && statusParam === 'succeeded') {
      this.confirmarComBackend(this.paymentIntentId);
    }

    else{
      this.status.set('error');
    }
  }

  confirmarComBackend(id: string) {

    if (!id || id === 'null') return;

    console.log('Tentando confirmar ID:', id);
    this.status.set('loading');

    this.stripeService.confirmPayment(id).subscribe({
      next: (res) => {
        console.log('SUCESSO NO ANGULAR:', res);
        this.ticketDetails.set(res);
        this.status.set('success');
      },
      error: (err) => {
        console.error('ERRO DETALHADO:', err);

        this.status.set('error');
      },
    });
  }
}
