import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'calculator' | 'order'>('home');
  const [selectedGarment, setSelectedGarment] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const { toast } = useToast();

  const garmentTypes = [
    { id: 'dress', name: 'Платье', basePrice: 8000 },
    { id: 'suit', name: 'Костюм', basePrice: 15000 },
    { id: 'coat', name: 'Пальто', basePrice: 20000 },
    { id: 'shirt', name: 'Рубашка', basePrice: 4000 },
    { id: 'pants', name: 'Брюки', basePrice: 5000 },
  ];

  const fabricTypes = [
    { id: 'cotton', name: 'Хлопок', multiplier: 1 },
    { id: 'wool', name: 'Шерсть', multiplier: 1.3 },
    { id: 'silk', name: 'Шелк', multiplier: 1.5 },
    { id: 'cashmere', name: 'Кашемир', multiplier: 2 },
    { id: 'velvet', name: 'Бархат', multiplier: 1.4 },
  ];

  const services = [
    { id: 'express', name: 'Экспресс-изготовление (3 дня)', price: 5000 },
    { id: 'fitting', name: 'Дополнительная примерка', price: 1500 },
    { id: 'embroidery', name: 'Вышивка', price: 3000 },
    { id: 'lining', name: 'Премиальная подкладка', price: 2000 },
  ];

  const calculatePrice = () => {
    const garment = garmentTypes.find(g => g.id === selectedGarment);
    const fabric = fabricTypes.find(f => f.id === selectedFabric);
    
    if (!garment || !fabric) return;

    let total = garment.basePrice * fabric.multiplier;
    additionalServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) total += service.price;
    });

    setEstimatedPrice(total);
  };

  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заказ принят",
      description: "Мы свяжемся с вами в ближайшее время для уточнения деталей.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-primary">Atelier Premium</h1>
            <div className="flex gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === 'home' ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('calculator')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === 'calculator' ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                Калькулятор
              </button>
              <button
                onClick={() => setActiveSection('order')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === 'order' ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <div className="pt-20 animate-fade-in">
          <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://cdn.poehali.dev/projects/7be349b9-8c22-4c42-9cc2-117a459caea2/files/8090e30b-ec43-4342-a481-04dd5ddf68e2.jpg"
                alt="Atelier workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            </div>
            <div className="relative z-10 container mx-auto px-4 text-center">
              <h2 className="text-6xl md:text-7xl font-bold text-secondary mb-6 animate-scale-in">
                Мастерство и элегантность
              </h2>
              <p className="text-xl md:text-2xl text-secondary/90 mb-8 max-w-2xl mx-auto font-light">
                Создаём изделия премиум-класса с учётом ваших индивидуальных особенностей
              </p>
              <Button
                size="lg"
                onClick={() => setActiveSection('calculator')}
                className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-6"
              >
                Рассчитать стоимость
              </Button>
            </div>
          </section>

          <section className="py-24 container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-16">Наши преимущества</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Scissors" className="text-accent" size={24} />
                  </div>
                  <CardTitle className="text-2xl">Индивидуальный подход</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Каждое изделие создаётся с учётом ваших особенностей фигуры и пожеланий
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Sparkles" className="text-accent" size={24} />
                  </div>
                  <CardTitle className="text-2xl">Премиум-материалы</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Используем только натуральные ткани высочайшего качества
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Clock" className="text-accent" size={24} />
                  </div>
                  <CardTitle className="text-2xl">Быстрое оформление</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Онлайн-калькулятор и заказ за 5 минут без визита в ателье
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-24 bg-muted">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-4xl font-bold mb-6">Процесс работы</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Рассчитайте стоимость</h4>
                        <p className="text-muted-foreground">
                          Используйте онлайн-калькулятор для расчёта цены вашего изделия
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Оформите заказ</h4>
                        <p className="text-muted-foreground">
                          Заполните форму онлайн или приезжайте к нам для снятия мерок
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Получите готовое изделие</h4>
                        <p className="text-muted-foreground">
                          Мы создадим ваш заказ за 7-14 дней в зависимости от сложности
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="https://cdn.poehali.dev/projects/7be349b9-8c22-4c42-9cc2-117a459caea2/files/42ceaac9-8160-4f85-8c58-c35dc85615c6.jpg"
                    alt="Working process"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeSection === 'calculator' && (
        <div className="pt-32 pb-20 container mx-auto px-4 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-4 text-center">Калькулятор стоимости</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Узнайте предварительную стоимость вашего изделия
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-xl border-none">
                <CardHeader>
                  <CardTitle className="text-2xl">Выберите параметры</CardTitle>
                  <CardDescription>Настройте ваше изделие</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <Label className="text-base mb-4 block font-semibold">Тип изделия</Label>
                    <RadioGroup value={selectedGarment} onValueChange={setSelectedGarment}>
                      {garmentTypes.map(garment => (
                        <div key={garment.id} className="flex items-center space-x-3 mb-3">
                          <RadioGroupItem value={garment.id} id={garment.id} />
                          <Label htmlFor={garment.id} className="cursor-pointer flex-1">
                            {garment.name}
                            <span className="text-muted-foreground ml-2">
                              от {garment.basePrice.toLocaleString()} ₽
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base mb-4 block font-semibold">Тип ткани</Label>
                    <RadioGroup value={selectedFabric} onValueChange={setSelectedFabric}>
                      {fabricTypes.map(fabric => (
                        <div key={fabric.id} className="flex items-center space-x-3 mb-3">
                          <RadioGroupItem value={fabric.id} id={fabric.id} />
                          <Label htmlFor={fabric.id} className="cursor-pointer">
                            {fabric.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base mb-4 block font-semibold">Дополнительные услуги</Label>
                    {services.map(service => (
                      <div key={service.id} className="flex items-center space-x-3 mb-3">
                        <Checkbox
                          id={service.id}
                          checked={additionalServices.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                        <Label htmlFor={service.id} className="cursor-pointer flex-1">
                          {service.name}
                          <span className="text-muted-foreground ml-2">
                            +{service.price.toLocaleString()} ₽
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={calculatePrice}
                    disabled={!selectedGarment || !selectedFabric}
                    className="w-full bg-accent text-primary hover:bg-accent/90"
                    size="lg"
                  >
                    Рассчитать стоимость
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="shadow-xl border-none bg-primary text-secondary">
                  <CardHeader>
                    <CardTitle className="text-2xl">Итоговая стоимость</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {estimatedPrice > 0 ? (
                      <div className="animate-scale-in">
                        <div className="text-5xl font-bold mb-4">
                          {estimatedPrice.toLocaleString()} ₽
                        </div>
                        <p className="text-secondary/80 mb-6">
                          Точная стоимость будет определена после консультации с мастером
                        </p>
                        <Button
                          onClick={() => setActiveSection('order')}
                          className="w-full bg-accent text-primary hover:bg-accent/90"
                          size="lg"
                        >
                          Оформить заказ
                        </Button>
                      </div>
                    ) : (
                      <p className="text-secondary/80 text-center py-8">
                        Выберите параметры и нажмите "Рассчитать стоимость"
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-none">
                  <CardHeader>
                    <CardTitle className="text-xl">Что входит в стоимость?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-sm">Консультация с мастером</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-sm">Снятие мерок и построение выкройки</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-sm">Пошив изделия</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-sm">Две примерки</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-accent flex-shrink-0 mt-1" size={20} />
                      <p className="text-sm">Подгонка по фигуре</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'order' && (
        <div className="pt-32 pb-20 container mx-auto px-4 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-4 text-center">Оформление заказа</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Заполните форму, и мы свяжемся с вами для уточнения деталей
            </p>

            <Card className="shadow-2xl border-none">
              <CardContent className="pt-6">
                <form onSubmit={handleOrderSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input id="name" placeholder="Введите ваше имя" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="garment-type">Тип изделия *</Label>
                    <Input id="garment-type" placeholder="Платье, костюм, пальто..." required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание заказа</Label>
                    <Textarea
                      id="description"
                      placeholder="Опишите, что вы хотите сшить: фасон, цвет, особые пожелания..."
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Желаемый срок изготовления</Label>
                    <Input id="deadline" type="date" />
                  </div>

                  <div className="bg-muted p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg">Следующий шаг</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <Icon name="Phone" className="text-accent flex-shrink-0 mt-0.5" size={18} />
                        <p>Мы позвоним вам в течение 2 часов для уточнения деталей</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Calendar" className="text-accent flex-shrink-0 mt-0.5" size={18} />
                        <p>Согласуем удобное время для визита в ателье и снятия мерок</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Ruler" className="text-accent flex-shrink-0 mt-0.5" size={18} />
                        <p>Подберём ткани и утвердим дизайн изделия</p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-accent text-primary hover:bg-accent/90" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Есть вопросы? Свяжитесь с нами</p>
              <div className="flex justify-center gap-6">
                <a href="tel:+74951234567" className="flex items-center gap-2 text-accent hover:underline">
                  <Icon name="Phone" size={20} />
                  +7 (495) 123-45-67
                </a>
                <a href="mailto:info@atelier.ru" className="flex items-center gap-2 text-accent hover:underline">
                  <Icon name="Mail" size={20} />
                  info@atelier.ru
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-primary text-secondary py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Atelier Premium</h2>
          <p className="text-secondary/80 mb-6">
            Индивидуальный пошив одежды премиум-класса с 2010 года
          </p>
          <div className="flex justify-center gap-8 mb-6">
            <a href="#" className="text-secondary/80 hover:text-secondary transition-colors">
              О нас
            </a>
            <a href="#" className="text-secondary/80 hover:text-secondary transition-colors">
              Портфолио
            </a>
            <a href="#" className="text-secondary/80 hover:text-secondary transition-colors">
              Контакты
            </a>
          </div>
          <p className="text-sm text-secondary/60">© 2024 Atelier Premium. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
