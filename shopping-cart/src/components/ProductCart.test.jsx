import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

// 테스트용 가짜 상품 데이터 (Fake Props)
const mockProduct = {
  id: 1,
  title: "Test Backpack",
  price: 109.95,
  image: "https://via.placeholder.com/150",
};

describe("ProductCard component", () => {
  it("상품의 제목과 가격, 이미지를 올바르게 렌더링한다", () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

    // 1. 제목과 가격이 화면에 존재하는지 확인
    expect(screen.getByText("Test Backpack")).toBeInTheDocument();
    expect(screen.getByText(/109.95/)).toBeInTheDocument();

    // 2. 이미지가 올바른 src와 alt를 가지는지 확인
    const img = screen.getByRole("img", { name: "Test Backpack" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProduct.image);
  });

  it("+ 버튼을 누르면 화면의 수량이 증가한다", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

    // + 버튼 찾기
    const plusButton = screen.getByRole("button", { name: "+" });
    await user.click(plusButton);

    // 수량이 2로 올라갔는지 확인 (input이거나 텍스트 노드)
    const quantityDisplay = screen.getByDisplayValue("2") || screen.getByText("2");
    expect(quantityDisplay).toBeInTheDocument();
  });

  it("Add to Cart 버튼 클릭 시 onAddToCart 콜백이 호출된다", async () => {
    const user = userEvent.setup();
    // vitest의 mock 함수 생성
    const mockAddToCart = vi.fn();

    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addButton);

    // 함수가 최소 1회 호출되었는지 검증
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    // 전달된 인자(product, 기본수량 1) 검증
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});