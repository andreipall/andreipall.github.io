---
layout: post
title:  "How to create a Symfony form that populates multiple entities"
date:   2026-06-22 06:46:56
categories: PHP
description: How to create a Symfony form that populates multiple entities
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Use a form model / DTO as the form's data_class, then create/update the real entities after submit. This is usually cleaner than binding one form directly to multiple Doctrine entities.
---
<p>Use a form model / DTO as the form's data_class, then create/update the real entities after submit. This is usually cleaner than binding one form directly to multiple Doctrine entities.</p>
{% highlight php %}
// src/Form/Model/RegisterCompanyData.php
class RegisterCompanyData
{
    public ?string $companyName = null;
    public ?string $userEmail = null;
    public ?string $userName = null;
}
{% endhighlight %}
{% highlight php %}
// src/Form/RegisterCompanyType.php
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RegisterCompanyType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('companyName', TextType::class)
            ->add('userEmail', EmailType::class)
            ->add('userName', TextType::class);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => RegisterCompanyData::class,
        ]);
    }
}
{% endhighlight %}
<p>Then map it to multiple entities:</p>
{% highlight php %}
#[Route('/register-company')]
public function register(Request $request, EntityManagerInterface $em): Response
{
    $data = new RegisterCompanyData();

    $form = $this->createForm(RegisterCompanyType::class, $data);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
        $company = new Company();
        $company->setName($data->companyName);

        $user = new User();
        $user->setEmail($data->userEmail);
        $user->setName($data->userName);
        $user->setCompany($company);

        $em->persist($company);
        $em->persist($user);
        $em->flush();

        return $this->redirectToRoute('success');
    }

    return $this->render('register_company.html.twig', [
        'form' => $form,
    ]);
}
{% endhighlight %}
<p>Symfony forms are designed to map submitted data to an object, and Symfony also supports embedded forms and collections for related objects. For unrelated or multi-aggregate writes, a DTO/form model is usually the safest approach.</p>
