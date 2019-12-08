---
layout: post
title:  "PHP agile design patterns"
date:   2014-09-25 22:12:45
categories: PHP
description: PHP agile design patterns
keywords: [Andrei Pall, blog, php, test]
excerpt: In software engineering, a design pattern is a general repeatable solution to a commonly occurring problem in software design. A design pattern isn't a finished design that can be transformed directly into code. It is a description or template for how to solve a problem that can be used in many different situations.
---

<a href="http://sourcemaking.com/design_patterns" target="_blank">Design patterns:</a><br />
<h6>Factory pattern</h6>
{% highlight php %}
<?php
interface Product {
	function getPrice();
	function getPicture();
	function getDescription();
}
?>
{% endhighlight %}

{% highlight php %}
<?php
class Mouse implements Product {
	public function getDescription() {

	}

	public function getPicture() {

	}

	public function getPrice() {

	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
class Keyboard implements Product {
	public function getDescription() {
		return "simple description";
	}

	public function getPicture() {
		return null;
	}

	public function getPrice() {
		return 50;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
class ProductFactory {

	function make($productId) {
		if ($this->isKeyboard($productId))
			return new Keyboard();
		return new Mouse();
	}

	private function isKeyboard($productId) {
		return substr($productId, 0, 1) == 'k';
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
class ShoppingCart {

	private $productsInTheCart = array();
	private $productFactory;

	public function __construct() {
		$this->productFactory = new ProductFactory();
	}

	function add($productId) {
		$this->productsInTheCart[] = $this->productFactory->make($productId);
	}
}
?>
{% endhighlight %}

<h6>Gateway pattern</h6>
{% highlight php %}
<?php
interface CartGateway {
	function persist(ShoppingCart $cart);
	function retrieve($id);
	function getIdOfRecordedCart();
}
?>
{% endhighlight %}

{% highlight php %}
<?php
class FileCart implements CartGateway {
	private $fileId;

	public function __construct() {
		$this->fileId = uniqid();
	}

	public function getIdOfRecordedCart() {
		return $this->fileId;
	}

	public function persist(ShoppingCart $cart) {
		file_put_contents($this->fileId, serialize($cart));
	}

	public function retrieve($id) {
		return unserialize(file_get_contents($id));
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
class InMemoryCart implements CartGateway {
	private $listOfCarts = array();

	public function getIdOfRecordedCart() {
		return end($this->listOfCarts);
	}

	public function persist(ShoppingCart $cart) {
		$this->listOfCarts[] = $cart;
	}

	public function retrieve($id) {
		return $this->listOfCarts[$id];
	}
}

?>
{% endhighlight %}

{% highlight php %}
<?php
class ShoppingHistory {
	private $gateway;
	private $shoppingCartIds = array();

	public function __construct(CartGateway $gateway, $ids = array()) {
		$this->gateway = $gateway;
		$this->shoppingCartIds = $ids;
	}

	function listAllCarts() {
		$shoppingCarts = array();

		foreach ($this->shoppingCartIds as $id) {
			$shoppingCarts[] = $this->gateway->retrieve($id);
		}

		return $shoppingCarts;
	}
}

?>
{% endhighlight %}

<h6>Proxy pattern</h6>
{% highlight php %}
<?php
interface Cart {
	function getProducts();
}
?>
{% endhighlight %}

{% highlight php %}
<?php
class ShoppingCart implements Cart {
	private $products;

	public function getProducts() {
		return $this->products;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once './ShoppingCart.php';

class CartProxy implements Cart {
	private $shoppinCart;

	public function getProducts() {
		if(is_null($this->shoppinCart))
			$this->shoppingCart = $gateway->getCarts();
		return $this->shoppingCart->getProducts();
	}
}
?>
{% endhighlight %}

<h6>Repository pattern</h6>
{% highlight php %}
<?php

class ProductType {
	private $category;
	private $name;
	private $code;

	public function __construct($category, $name, $code) {
		$this->category = $category;
		$this->name = $name;
		$this->code = $code;
	}

	function __get($typeProperty) {
		if(!isset($this->$typeProperty))
			throw new Exception ('No such property');
		return $this->$typeProperty;
	}

}

?>
{% endhighlight %}

{% highlight php %}
<?php

class TypesFactory {

	function makeFrom($typeData = array()) {
		if (empty($typeData)) return null;

		return new ProductType (
				$typeData['category'], $typeData['name'], $typeData['code']);
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php

class TypesGateway {
	function retrieveAllTypes() {
		// Here should be some complicated logic returning all the tipes.
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php

require_once './TypesFactory.php';
require_once './TypesGateway.php';

class ProductTypes {
	private $factory;
	private $gateway;

	public function __construct(TypesFactory $factory, TypesGateway $gateway) {
		$this->factory = $factory;
		$this->gateway = $gateway;
	}

	function findAll() {
		$allTypes = array();
		$allTypes = $this->gateway->retrieveAllTypes();

		return $this->makeAllForTypes($allTypes);
	}

	function findComputerHardware() {
		$allTypes = $this->gateway->retrieveAllTypes();
		$hardwareTypes = array_filter($allTypes, function ($item) {
			return $item['group'] == 'CmputerHardware';
		});
		return $this->makeAllForTypes($hardwareTypes);
	}

	private function makeAllForTypes($allTypes) {
		$types = array();

		foreach($allTypes as $typeData) {
			$types[] = $this->factory->makeFrom($typeData);
		}
		return $types;
	}
}
?>
{% endhighlight %}

<h6>Null pattern</h6>
{% highlight php %}
<?php

class NullProduct implements Product {
	public function getDescription() {
		return '';
	}

	public function getPicture() {
		return '/img/default.png';
	}

	public function getPrice() {
		return 0;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'NullProduct.php';

// Provides products of different types.
// This may be a gateway, a repository or a dabatase access layer. Doesn't matter.
class ProductProvider {
	function findProduct($id) {
		if($id == 0)
			return new Keyboard ();
		return new NullProduct();
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once __DIR__ . '/../Factory/Product.php';
require_once 'ProductProvider.php';

class Receipt {
	private $total;

	function addProductById($id) {
		$provider = new ProductProvider();
		$product = $provider->findProduct($id);
		$this->addToTotal($product);
	}

	function addToTotal(Product $product) {
		$this->total += $product->getPrice();
	}

	function getTotalPrice() {
		return $this->total;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once '../Receipt.php';
require_once '../../Factory/Keyboard.php';

class NullObjectPatternTest extends PHPUnit_Framework_TestCase {

	function testNullBehavior() {
		$this->assertEquals(2, null + 2);
		$this->assertEquals('nothing', null . 'nothing');

		$this->assertTrue(null == 0);
		$this->assertTrue(null < -1);

		$this->assertFalse(null && false);
    //$this->assertFalse(null);
    //$this->assertTrue(true && null);

		if (null) // should this be false or true?
			echo 'Inside IF statement';
		else
			echo 'Inside ELSE';

    //$this->assertTrue(is_object(null));
	}

	function testReceiptCanAddProductsToItTotal() {
		$receipt = new Receipt();

		$product = new Keyboard();
		$receipt->addToTotal($product);

		$this->assertEquals(50, $receipt->getTotalPrice());

		$receipt->addProductById(1);
		$this->assertEquals(50, $receipt->getTotalPrice());
	}
}
?>
{% endhighlight %}

<h6>Command pattern</h6>
{% highlight php %}
<?php

interface PaymentMethod_Y {
	function execute();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class PaymentProcessingException extends Exception {
	public function __construct($message) {
		parent::__construct($message);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'PaymentMethod.php';

class PayPalPayment implements PaymentMethod {
	public function execute() {

	}

	public function __toString() {
		return 'PayPal';
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class VisaPayment implements PaymentMethod {
	public function execute() {
			// Here would be a lot of logic about how to pay for a product with VISA
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class User {
	private $paymentMethod;

	function getPaymentMethod() {
		return $this->paymentMethod;
		// VisaPayment or PayPalPayment
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php

require_once 'User.php';
require_once 'PaymentMethod.php';
require_once 'PaymentProcessingException.php';

class ProcessPayment {

	function processUserPayment($userName) {
		$user = new User($userName);
		$paymentMethod = $user->getPaymentMethod();
		$this->executePayment($paymentMethod);
	}

	private function executePayment(PaymentMethod $paymentMethod) {
		try {
			$paymentMethod->execute();
		} catch (Exception $e) {
			throw new PaymentProcessingException(
					'Paying with ' . $paymentMethod .
					' has failed with error: ' . $e->message
			);
		}
	}

}
?>
{% endhighlight %}

<h6>Active object pattern</h6>
{% highlight php %}
<?php

class UploaderCommand {
	private $size;
	private $chunk;
	private $uploaded;
	private $multiUploader;

	function __construct($speed, $size, MultiFileUploader $multiuploader) {
		$this->size = $size;
		$this->chunk = $size / $speed;
		$this->multiUploader = $multiuploader;
	}

	function execute() {
		$this->uploaded += $this->chunk;

		print "\n" . $this->uploaded . '/' . $this->size;

		if($this->uploaded < $this->size)
			$this->multiUploader->addUPloader($this);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class MultiFileUploader {
	private $uploaders = array();

	function addUPloader(UploaderCommand $uploader) {
		$this->uploaders[] = $uploader;
	}

	function run() {
		while (!empty($this->uploaders)) {
			$uploader = array_shift($this->uploaders);
			$uploader->execute();
		}
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once '../UploaderCommand.php';
require_once '../MultiFileUploader.php';

class MultiUploadTest extends PHPUnit_Framework_TestCase {

	function testItCanUploadMultipleFiles() {
		$multiUploader = new MultiFileUploader();

		$speed = 8; $size = 50;
		$uploaderOne = new UploaderCommand($speed, $size, $multiUploader);
		$multiUploader->addUploader($uploaderOne);

		$speed = 4; $size = 20;
		$uploaderTwo = new UploaderCommand($speed, $size, $multiUploader);
		$multiUploader->addUploader($uploaderTwo);

		$multiUploader->run();
	}

}
?>
{% endhighlight %}

<h6>Template pattern</h6>
{% highlight php %}
<?php

abstract class Sell {
	private $inventory;
	private $paymentProvider;


	public function removeFromInventory() {
		$this->inventory->remove($this);
	}

	public function retreivePayment() {
		$this->paymentProvider->retrieve($this->price);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'Sell.php';

class SellProducts extends Sell {
	private $price;
	private $provider;

	function orderNewItem() {
		$this->provider->orderNewItem($this);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'Sell.php';

class SellServices implements Sell {
	private $price;
	private $humanResources;

	function markHumanResourcesAsOccupied() {
		$this->humanResources->mark(2);
	}

}
?>
{% endhighlight %}

<h6>Strategy pattern</h6>
{% highlight php %}
<?php

interface PriceCalculator {
	function negativeDiscount($price);
	function calculateTaxes($price);
	function convertCurrency($price);
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class GrandPrice {

	private $sellerFrom;

	function calculate($price, PriceCalculator $pricingStrategy) {
		$grandPrice = $price;
		$grandPrice += $pricingStrategy->negativeDiscount($price);
		$grandPrice += $pricingStrategy->calculateTaxes($price);
		$grandPrice = $pricingStrategy->convertCurrency($price);
		return $grandPrice;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class EuropePricingStrategy implements PriceCalculator {
	function convertCurrency($price) {
		return $price * 0.70;
	}

	public function calculateTaxes($price) {
		return $price * 20 / 100;
	}

	public function negativeDiscount($price) {
		if($price > 1000)
			return -100;
		return -10;
	}


}
?>
{% endhighlight %}

{% highlight php %}
<?php

class USAPricingStrategy implements PriceCalculator {
	public function calculateTaxes($price) {
		return $price * 5 / 100;
	}

	public function convertCurrency($price) {
		return $price * 1;
	}

	public function negativeDiscount($price) {
		return -50;
	}

}
?>
{% endhighlight %}

<h6>Facade pattern</h6>
{% highlight php %}
<?php

class ClientData {

}
?>
{% endhighlight %}

{% highlight php %}
<?php

class TopPayments {
	function findMaxForClientWithId($clientId) {
		return 150;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class ClientPersonalData {
	private $streetAddress;
	private $postalCode;
	private $country;

	public function __construct($clienId) {
		// Class will load itself on creation with Active Record
		// or some similar pattern and populate it's private variables
	}

	function getStreetAddress() {
		return $this->streetAddress;
	}

	function getPostalCode() {
		return $this->postalCode;
	}

	function getCountry() {
		return $this->country;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class ClientFacade {

	function getAllClientData($clientID) {
		return array(
			$clientID,
			$this->ClientAddress($clientID),
			$this->getMostPayedFor($clientID),
			$this->getPaymentHistory($clientId)
		);
	}

	private function ClientAddres($clientID) {
		$clientShippingAddress = '';

		$clientPersonalData = new ClientPersonalData($clienId);
		$clientShippingAddress = $clientPersonalData->getAddress();
		$clientShippingAddress .= ',' . $clientPersonalData->getCountry();
		$clientShippingAddress .= ',' . $clientPersonalData->getPostalCode();

		return $clientShippingAddress;
	}

	private function getMostPayedFor($clientId) {
		$topPayments = new TopPayments();
		return $topPayments->findMaxForClientWithId($clientId);

	}

	private function getPaymentHistory($clientID) {
		$paymentHIstory = new PaymentHistory();
		return $paymentHIstory->findPaymentsForClient($clientId);

	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class PaymentHistory {
	function findPaymentsForClient($clientId) {
		return array(50, 150, 20, 15);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class Statistics {

	private $clientData;
	private $facade;

	public function __construct(ClientFacade $facade) {
		$this->clientData = new ClientData();
		$this->facade = $facade;
	}

	function loadAllClientStats($clientId) {
		$allClientDataArray = $this->facade->getAllClientData($clientID);

		$this->clientData->id = $allClientDataArray[0];
		$this->clientData->address = $allClientDataArray[1];
		$this->clientData->mostPaydFor = $allClientDataArray[2];
		$this->clientData->userHistory = $allClientDataArray[3];
	}
}
?>
{% endhighlight %}

<h6>Observer pattern</h6>
{% highlight php %}
<?php

interface ProductObserver {
	function update();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

abstract class ProductSubject {
	private $observers = array();

	function register(ProductObserver $observer) {
		$this->observers[] = $observer;
	}

	protected function notify() {
		foreach($this->observers as $observer)
			$observer->update();
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once __DIR__ . '/ProductObserver.php';
require_once __DIR__ . '/ProductSubject.php';

class Notifier implements ProductObserver{
	private $product;

	function __construct(ProductSubject $subject) {
		$this->product = $subject;
	}

	public function update() {
		$newPrice = $this->product->getPrice();
		// some kind of notification
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once __DIR__ . '/ProductSubject.php';

class HardDisk extends ProductSubject {

	private $price;

	function setPrice($price) {
		$this->price = $price;
		$this->notify();
	}

	function getPrice() {
		return $this->price;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once '../Notifier.php';
require_once '../HardDisk.php';

class ObserverTest extends PHPUnit_Framework_TestCase {

	function testItCanNotify() {
		$product = new HardDisk();
		$mailNotifier = new Notifier($product);
		$product->register($mailNotifier);
	}
}
?>
{% endhighlight %}

<h6>Mediator pattern</h6>
{% highlight php %}
<?php

interface UserAddress {
	function setAddress();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

abstract class Observable {
	private $observers = array();

	function register($observer) {
		$this->observers[] = $observer;
	}

	private function notify($hint) {
		foreach($this->observers as $observer) {
			$observer->update($hint);
		}
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once './Observable.php';
require_once './UserAddress.php';

class Mediator {

	private $observedClass;
	private $affectedClass;

	function __construct(Observable $observedClass, UserAddress $affectedClass) {
		$this->observedClass = $observedClass;
		$this->affectedClass = $affectedClass;
		$observedClass->register($this);
	}

	function update($address) {
		$this->affectedClass->setAddress($address);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class OrderDelivery implements UserAddress {
	private $deliveryAddress;

	public function setAddress($newAddress) {
		$this->deliveryAddress = $newAddress;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class UserDetails extends Observable {
	private $address;

	function cangeAddress($newAddress) {
		$this->address = $newAddress;
		$this->notify($newAddress);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once './UserDetails.php';

class UserUpdater {

	function updateUserAddress($newAddress) {
		$user = new UserDetails();
		$user->cangeAddress($newAddress);
	}
}
?>
{% endhighlight %}

<h6>Singleton pattern</h6>
{% highlight php %}
<?php

class DiscountProvider {
	private static $instance = null;

	private function __construct() {
		// here would be some complicated init logic
	}

	static function getInstance() {
		if(self::$instance == NULL)
			self::$instance = new DiscountProvider();
		return self::$instance;
	}

	function getDiscountFor($product) {
		// it would return the discounted price as percentage
		return 30;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class PriceCalculator {
	function compute(Product $product) {

		$discountProvider = DiscountProvider::getInstance();
		$discountAsPercent = $discountProvider->getDiscountFor($product-getId());

		$price = $product->getPrice();
		$discountAsValue = $price * $discountAsPercent;
		return $price - $discountAsValue;
	}
}
?>
{% endhighlight %}

<h6>Monostate pattern</h6>
{% highlight php %}
<?php

class Monostate {
	private static $value; // Static value

	function setValue($value) { // Dynamic function
		self::$value = $value; // Static value
	}

	function getValue() { // Dynamic function
		return self::$value; // Static value
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once '../Monostate.php';

class MonostateTest extends PHPUnit_Framework_TestCase {

	function testMonostate() {
		$firstObject = new Monostate();
		$secondObject = new Monostate();

		$firstObject->setValue('10');

		$this->assertEquals(10, $firstObject->getValue());
		$this->assertEquals(10, $secondObject->getValue());

		$this->assertEquals(10, $thirdObject->getValue());

	}

}
?>
{% endhighlight %}

<h6>Abstract server pattern</h6>
{% highlight php %}
<?php

interface Roses {
	function sell();
	function isSold();
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once __DIR__ . '/Roses.php';

class RedRose implements Roses {
	private $sold = false;

	function sell() {
		$this->sold = true;
	}

	function isSold() {
		return $this->sold;
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php

class YellowRose implements Roses {
	private $sold = false;

	function sell() {
		$this->sold = true;
	}

	function isSold() {
		return $this->sold;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once __DIR__ . '/RedRose.php';

class ShopOwner {
	private $rose;

	function __construct(Roses $rose) {
		$this->rose = $rose;
	}

	function sell() {
		$this->rose->sell();
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once '../RedRose.php';
require_once '../YellowRose.php';
require_once '../ShopOwner.php';

class ShopOwnerTest extends PHPUnit_Framework_TestCase {

	function testOwnerCanSellRedRoses() {
		$redRose = new RedRose();
		$shopOwner = new ShopOwner($redRose);

		$shopOwner->sell();

		$this->assertTrue($redRose->isSold());
	}

	function testOwnerCanSellYellowRoses() {
		$yellowRose = new YellowRose();
		$shopOwner = new ShopOwner($yellowRose);

		$shopOwner->sell();

		$this->assertTrue($yellowRose->isSold());
	}

}
?>
{% endhighlight %}

<h6>Adapter pattern</h6>
{% highlight php %}
<?php

interface ProductInterface {
	function getDescription();
	function getPrice();
	function getPicture();
	function sell();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

interface TheOldRosesInterface {
	function sell();
	function showImage();
	function getPriceFromDatabase();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class RealWhiteRose implements TheOldRosesInterface {
	public function getPriceFromDatabase() {

	}

	public function sell() {

	}

	public function showImage() {

	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class RosesToProductAdapter implements ProductInterface {
	private $rose;

	function _construct(TheOldRosesInterface $rose) {
		$this->rose = $rose;
	}

	public function getDescription() {
		return 'Nice flowers';
	}

	public function getPicture() {
		return $this->rose->showImage();
	}

	public function getPrice() {
		return $this->rose->getPriceFromDatabase();
		// Formatting and currency calculations may be involved.
	}

	public function sell() {
		return $this->rose->sell();
	}
}
?>
{% endhighlight %}

<h6>Bridge pattern</h6>

{% highlight php %}
<?php

interface PaymentSource {
	function approve();
	function send();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

interface CreditPayment {
	function approve();
	function send();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class Visa implements PaymentSource {
	public function approve() {
		// Talk to the bank and approve the sum
	}

	public function send() {
		// Transfer the money
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class CreditBuyer {
	function payNOw(CreditPayment $payment) {
		if($payment->approve())
			$payment->send();
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class CreditPaymentMethod extends PaymentMethod {

	function approve() {
		parent::approveImp();
	}

	function send() {
		parent::sendImp();
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

interface DirectPayment {
	function send();

}
?>
{% endhighlight %}

{% highlight php %}
<?php

class DirectBuyer {
	function payNow(DirectPayment $payment) {
		$payment->send();
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class DirectPaymentMethod extends PaymentMethod {

	public function approve() {
		return true;
	}

	public function send() {
		parent::sendImp();
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class Mastercard implements PaymentSource {
	public function approve() {

	}

	public function send() {

	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

abstract class PaymentMethod_X implements DirectPayment, CreditPayment {

	abstract function approve();
	abstract function send();

	private $paymentSource;
	function setPaymentSource(PaymentSource $paymentSource) {
		$this->paymentSource = $paymentSource;
	}

	protected function sendImp() {
		$this->paymentSource->send();
	}

	protected function approveImp() {
		$this->paymentSource->approve();
	}

}
?>
{% endhighlight %}

<h6>Composite pattern</h6>
{% highlight php %}
<?php

interface Order {
	function place();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class ProductOrder implements Order {
	public function place() {
		// Talkt to warehouse.
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class ServiceOrder implements Order {

	public function place() {
		// Communicate with HR and require personal for servicing products
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class CompositeOrder implements Order {
	private $orders = array();

	function add(Order $order) {
		$this->orders[] = $order;
	}

	function place() {
		aray_walk($this->orders, function ($order) {
			$order->place();
		});
	}
}
?>
{% endhighlight %}

<h6>Visitor pattern</h6>
{% highlight php %}
<?php

interface PaymentMethod {
	public function getDescription();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

interface PaymentVisitor {
	function visit(PaymentMethod $paymentMethod);
	function getDescription();
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'PaymentVisitor.php';

class HtmlPaymentDetails implements PaymentVisitor {
	private $description;

	public function getDescription() {
		return $this->description;
	}

	public function visit(PaymentMethod $paymentMethod) {
		$this->description = '<html><body><div>' .
				$paymentMethod->getDescription() .
				'</div></body></html>';
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php

class PaypalPayment implements PaymentMethod {
	public function getDescription() {
		return "PaypalDescription";
	}

	function accept(PaymentVisitor $paymentVisitor) {
		$paymentVisitor->visit($this);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'PaymentVisitor.php';

class SimplePaymentDetails implements PaymentVisitor {
	private $description;

	public function getDescription() {
		return $this->description;
	}

	public function visit(PaymentMethod $paymentMethod) {
		$this->description = $paymentMethod->getDescription();
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'PaymentMethod.php';

class VisaPayment implements PaymentMethod {
	public function getDescription() {
		return "VisaDescription";
	}

	function accept(PaymentVisitor $paymentVisitor) {
		$paymentVisitor->visit($this);
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

require_once '../VisaPayment.php';
require_once '../PaypalPayment.php';
require_once '../SimplePaymentDetails.php';
require_once '../HtmlPaymentDetails.php';

class VisitorTest extends PHPUnit_Framework_TestCase {
	function testItCanProvideSimpleDescripion() {
		$simpleDetails = new SimplePaymentDetails();
		$visaPayment = new VisaPayment();

		$visaPayment->accept($simpleDetails);

		$this->assertEquals('VisaDescription', $simpleDetails->getDescription());
	}
	function testItCanProvideHtmlDescripion() {
		$htmlDetails = new HtmlPaymentDetails();
		$visaPayment = new VisaPayment();

		$visaPayment->accept($htmlDetails);

		$this->assertEquals(
				'<html><body><div>VisaDescription</div></body></html>',
				$htmlDetails->getDescription());
	}
}
?>
{% endhighlight %}

<h6>State pattern</h6>
{% highlight php %}
<?php

interface DeliveryState {
	function goNext(Delivery $delivery);
	function getLocation();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class Delivery {
	private $currentState;

	function __construct(DeliveryState $state) {
		$this->setState($state);
	}

	function getCurrentLocation() {
		return $this->currentState->getLocation();
	}

	function goNext() {
		$this->currentState->goNext($this);
	}

	function setState(DeliveryState $state) {
		$this->currentState = $state;
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class AtDestination implements DeliveryState {
	public function getLocation() {
		return 'Final Destination';
	}

	public function goNext(Delivery $delivery) {
		$delivery->setState(new AtDestination());
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php

class DeliveryUpdater {

}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'AtDestination.php';

class OnRoute implements DeliveryState {
	public function getLocation() {
		return 'On the train';
	}

	public function goNext(Delivery $delivery) {
		$delivery->setState(new AtDestination());
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php

class OrderTracker {

}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'Delivery.php';
require_once 'DeliveryState.php';
require_once 'OnRoute.php';

class Processing implements DeliveryState {
	public function getLocation() {
		return 'Warehouse';
	}

	public function goNext(Delivery $delivery) {
		$delivery->setState(new OnRoute());
	}
}

?>
{% endhighlight %}

{% highlight php %}
<?php
require_once '../Delivery.php';
require_once '../Processing.php';

class DeliveryStateTest extends PHPUnit_Framework_TestCase {

	function testItCanCreateADEliveryWithInitialState() {
		$delivery = new Delivery(new Processing());
		$this->assertEquals('Warehouse', $delivery->getCurrentLocation());
	}

	function testItCanGoFromProcessingToOnRoute() {
		$delivery = new Delivery(new Processing());
		$delivery->goNext();

		$this->assertEquals('On the train', $delivery->getCurrentLocation());
	}

	function testItCanGoFromOnRouteToDestination() {
		$delivery = new Delivery(new OnRoute());
		$delivery->goNext();

		$this->assertEquals('Final Destination', $delivery->getCurrentLocation());
	}

	function testItRemainsAtFinalDestination() {
		$delivery = new Delivery(new AtDestination());
		$delivery->goNext();

		$this->assertEquals('Final Destination', $delivery->getCurrentLocation());
	}
}
?>
{% endhighlight %}

<h6>Decorator pattern</h6>
{% highlight php %}
<?php

interface PaymentMethod {
	public function getDescription();
}
?>
{% endhighlight %}

{% highlight php %}
<?php

class PaypalPayment implements PaymentMethod {
	public function getDescription() {
		return 'PaypalDescription';
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'PaymentMethod.php';

class VisaPayment implements PaymentMethod {
	public function getDescription() {
		return 'VisaDescription';
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'PaymentMethod.php';

abstract class PaymentDecorator implements PaymentMethod {
	protected $itsPaymentMethod;

	function __construct(PaymentMethod $paymentMethod) {
		$this->itsPaymentMethod = $paymentMethod;
	}

	public function getDescription() {
		return $this->itsPaymentMethod->getDescription();
	}
}
?>
{% endhighlight %}

{% highlight php %}
<?php
require_once 'PaymentDecorator.php';

class HtmlPaymentDetails extends PaymentDecorator {

	function getHtmlDescription() {
		return '<html>'.$this->itsPaymentMethod->getDescription() . '</html>';
	}

}
?>
{% endhighlight %}

{% highlight php %}
<?php

require_once '../VisaPayment.php';
require_once '../HtmlPaymentDetails.php';

class VisitorTest extends PHPUnit_Framework_TestCase {
	function testItCanProvideDescription() {
		$visaPayment = new VisaPayment();
		$htmlDetails = new HtmlPaymentDetails($visaPayment);

		$this->assertEquals('VisaDescription', $htmlDetails->getDescription());
		$this->assertEquals('<html>VisaDescription</html>', $htmlDetails->getHtmlDescription());
	}

}
?>
{% endhighlight %}
